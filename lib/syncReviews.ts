// lib/syncReviews.ts
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { google } from "googleapis";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
function parseDate(s?: string) {
  return s ? new Date(s) : new Date(0);
}

function getOAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI!;
  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Faltan variables de entorno de Google OAuth");
  }
  return new google.auth.OAuth2({ clientId, clientSecret, redirectUri });
}

// Convierte posibles enums de Google a número 1–5
function toStars(v: unknown): number | null {
  if (v == null) return null;
  if (typeof v === "number") return v;
  if (typeof v === "string") {
    const map: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
    if (map[v]) return map[v];
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

async function getGMBClient(userId: string) {
  const supabase = getSupabaseAdmin();
  const { data: tok, error } = await supabase
    .from("oauth_google_tokens")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !tok) throw new Error("Faltan tokens OAuth para este usuario");

  const oauth2 = getOAuthClient();
  oauth2.setCredentials({
    access_token: tok.access_token,
    refresh_token: tok.refresh_token,
    expiry_date: tok.expiry_date ? new Date(tok.expiry_date).getTime() : undefined,
  });

  // Fallback defensivo si tu versión de googleapis no trae mybusiness v4
  const anyGoogle = google as any;
  if (!anyGoogle.mybusiness) {
    throw new Error(
      "La API google.mybusiness v4 no está disponible en tu versión de 'googleapis'. " +
      "Pinea una versión compatible o migra a Business Profile API."
    );
  }

  const mybusiness = anyGoogle.mybusiness({ version: "v4", auth: oauth2 });
  return { mybusiness };
}

async function upsertReview(location_id: string, r: any) {
  const supabase = getSupabaseAdmin();
  const review_id = r.reviewId || r.name;
  const payload = {
    review_id,
    location_id,
    reviewer: r.reviewer ?? null,
    star_rating: toStars(r.starRating),
    comment: r.comment ?? null,
    create_time: r.createTime ?? null,
    update_time: r.updateTime ?? null,
    review_json: r,
  };

  const { error } = await supabase
    .from("gmb_reviews")
    .upsert(payload, { onConflict: "review_id,location_id" });

  if (error) throw error;
}

function splitIds(locationName: string) {
  // locationName: "accounts/123/locations/456"
  const parts = locationName.split("/");
  return { accountId: parts[1], locationIdNum: parts[3] };
}

/** BACKFILL: trae todo el histórico para una ubicación */
export async function backfillLocationReviews(params: { userId: string; locationName: string }) {
  const { userId, locationName } = params;
  const { accountId, locationIdNum } = splitIds(locationName);
  const { mybusiness } = await getGMBClient(userId);

  let pageToken: string | undefined;
  do {
    const res = await mybusiness.accounts.locations.reviews.list({
      name: `accounts/${accountId}/locations/${locationIdNum}`,
      pageSize: 200,
      pageToken,
      orderBy: "updateTime desc",
    } as any);

    const reviews = res.data.reviews ?? [];
    for (const r of reviews) {
      await upsertReview(locationName, r);
    }

    pageToken = res.data.nextPageToken ?? undefined;
    await sleep(150); // respeta rate limits
  } while (pageToken);

  const supabase = getSupabaseAdmin();
  await supabase.from("gmb_sync_state").upsert({
    location_id: locationName,
    last_full_backfill_at: new Date().toISOString(),
    // arranca incremental desde 0 (se actualizará en la primera corrida)
    last_incremental_cursor: new Date(0).toISOString(),
  });
}

/** INCREMENTAL: solo nuevas/actualizadas desde el último cursor */
export async function syncIncrementalLocation(params: { userId: string; locationName: string }) {
  const { userId, locationName } = params;
  const { accountId, locationIdNum } = splitIds(locationName);
  const { mybusiness } = await getGMBClient(userId);

  const supabase = getSupabaseAdmin();
  const { data: state, error: stateErr } = await supabase
    .from("gmb_sync_state")
    .select("*")
    .eq("location_id", locationName)
    .single();

  if (stateErr && stateErr.code !== "PGRST116") {
    // ignora "no rows" (PGRST116), pero propaga otros errores reales
    throw stateErr;
  }

  const since = state?.last_incremental_cursor ? new Date(state.last_incremental_cursor) : new Date(0);
  let pageToken: string | undefined;
  let maxUpdate = since;

  do {
    const res = await mybusiness.accounts.locations.reviews.list({
      name: `accounts/${accountId}/locations/${locationIdNum}`,
      pageSize: 200,
      pageToken,
      orderBy: "updateTime desc",
    } as any);

    const reviews = res.data.reviews ?? [];
    let stop = false;

    for (const r of reviews) {
      const ut = parseDate(r.updateTime);
      if (ut <= since) { // ya llegamos a lo viejo
        stop = true;
        break;
      }
      if (ut > maxUpdate) maxUpdate = ut;
      await upsertReview(locationName, r);
    }

    if (stop) break;
    pageToken = res.data.nextPageToken ?? undefined;
    await sleep(150);
  } while (pageToken);

  await supabase.from("gmb_sync_state").upsert({
    location_id: locationName,
    last_incremental_cursor: maxUpdate.toISOString(),
  });
}

