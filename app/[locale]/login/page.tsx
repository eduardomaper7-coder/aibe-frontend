import LoginClient from "./LoginClient";

type PageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function LoginPage({ searchParams }: PageProps) {
  const raw = searchParams?.job_id;
  const jobId = Array.isArray(raw) ? raw[0] : raw;

  return <LoginClient jobId={jobId ?? null} />;
}