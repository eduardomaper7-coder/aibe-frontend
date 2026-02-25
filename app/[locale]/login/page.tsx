import LoginClient from "./LoginClient";

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { job_id?: string };
}) {
  return <LoginClient jobId={searchParams?.job_id ?? null} />;
}