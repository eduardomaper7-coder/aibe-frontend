// lib/syncReviews.ts
import { createSupabaseServer } from '@/lib/supabaseServer';
const supabase = createSupabaseServer();
import { google } from 'googleapis';

function sleep(ms:number){ return new Promise(r=>setTimeout(r,ms)); }
function parseDate(s?: string){ return s ? new Date(s) : new Date(0); }

function getOAuthClient() {
  return new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    redirectUri: process.env.GOOGLE_REDIRECT_URI!,
  });
}

async function getGMBClient(userId: string) {
  const { data: tok, error } = await supabase
    .from('oauth_google_tokens').select('*').eq('user_id', userId).single();
  if (error || !tok) throw new Error('Faltan tokens OAuth para este usuario');

  const oauth2 = getOAuthClient();
  oauth2.setCredentials({
    access_token: tok.access_token,
    refresh_token: tok.refresh_token,
    expiry_date: tok.expiry_date ? new Date(tok.expiry_date).getTime() : undefined,
  });

  // @ts-ignore
  const mybusiness = google.mybusiness({ version: 'v4', auth: oauth2 });
  return { mybusiness };
}

async function upsertReview(location_id: string, r: any) {
  const review_id = r.reviewId || r.name;
  const payload = {
    review_id,
    location_id,
    reviewer: r.reviewer ?? null,
    star_rating: r.starRating ? parseInt(r.starRating, 10) : null,
    comment: r.comment ?? null,
    create_time: r.createTime ?? null,
    update_time: r.updateTime ?? null,
    review_json: r,
  };
  const { error } = await supabase
    .from('gmb_reviews')
    .upsert(payload, { onConflict: 'review_id,location_id' });
  if (error) throw error;
}

function splitIds(locationName: string) {
  // locationName: "accounts/123/locations/456"
  const parts = locationName.split('/');
  return { accountId: parts[1], locationIdNum: parts[3] };
}

/** BACKFILL: trae todo el histórico para una ubicación */
export async function backfillLocationReviews(params: { userId: string, locationName: string }) {
  const { userId, locationName } = params;
  const { accountId, locationIdNum } = splitIds(locationName);
  const { mybusiness } = await getGMBClient(userId);

  let pageToken: string | undefined;
  do {
    const res = await mybusiness.accounts.locations.reviews.list({
      name: `accounts/${accountId}/locations/${locationIdNum}`,
      pageSize: 200,
      pageToken,
      orderBy: 'updateTime desc',
    } as any);

    const reviews = res.data.reviews ?? [];
    for (const r of reviews) await upsertReview(locationName, r);

    pageToken = res.data.nextPageToken ?? undefined;
    await sleep(150); // respeta rate limits
  } while (pageToken);

  // Guarda estado de sync
  await supabase.from('gmb_sync_state').upsert({
    location_id: locationName,
    last_full_backfill_at: new Date().toISOString(),
    last_incremental_cursor: new Date(0).toISOString(), // arranca incremental desde 0 (se actualizará en la primera corrida)
  });
}

/** INCREMENTAL: solo nuevas/actualizadas desde el último cursor */
export async function syncIncrementalLocation(params: { userId: string, locationName: string }) {
  const { userId, locationName } = params;
  const { accountId, locationIdNum } = splitIds(locationName);
  const { mybusiness } = await getGMBClient(userId);

  const { data: state } = await supabase
    .from('gmb_sync_state').select('*').eq('location_id', locationName).single();

  const since = state?.last_incremental_cursor ? new Date(state.last_incremental_cursor) : new Date(0);
  let pageToken: string | undefined;
  let maxUpdate = since;

  do {
    const res = await mybusiness.accounts.locations.reviews.list({
      name: `accounts/${accountId}/locations/${locationIdNum}`,
      pageSize: 200,
      pageToken,
      orderBy: 'updateTime desc',
    } as any);

    const reviews = res.data.reviews ?? [];
    let stop = false;

    for (const r of reviews) {
      const ut = parseDate(r.updateTime);
      if (ut <= since) { stop = true; break; }      // ya llegamos a lo viejo
      if (ut > maxUpdate) maxUpdate = ut;
      await upsertReview(locationName, r);
    }

    if (stop) break;
    pageToken = res.data.nextPageToken ?? undefined;
    await sleep(150);
  } while (pageToken);

  // Actualiza cursor
  await supabase.from('gmb_sync_state').upsert({
    location_id: locationName,
    last_incremental_cursor: maxUpdate.toISOString(),
  });
}
