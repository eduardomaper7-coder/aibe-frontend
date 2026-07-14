import SignupClient from "./SignupClient";

export default async function SignupPage({
  searchParams,
}: {
  searchParams?: Promise<{ job_id?: string }>;
}) {
  const sp = (await searchParams) ?? {};
  return <SignupClient variant="page" jobId={sp.job_id ?? null} />;
}