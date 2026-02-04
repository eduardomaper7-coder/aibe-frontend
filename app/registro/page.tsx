import SignupClient from "./SignupClient";

export default function SignupPage({
  searchParams,
}: {
  searchParams: { job_id?: string };
}) {
  return <SignupClient variant="page" jobId={searchParams.job_id ?? null} />;
}
