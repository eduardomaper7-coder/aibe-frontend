// app/debug/profile/page.tsx
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function DebugProfilePage() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session }, error: sErr } = await supabase.auth.getSession();

  let profile: any = null;
  let error: any = null;

  if (session) {
    const res = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();
    profile = res.data;
    error = res.error;
  }

  return (
    <pre style={{ padding: 16, whiteSpace: "pre-wrap" }}>
      {JSON.stringify({ sessionUser: session?.user ?? null, profile, error, sessionError: sErr ?? null }, null, 2)}
    </pre>
  );
}

