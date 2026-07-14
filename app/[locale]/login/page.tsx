import LoginClient from "./LoginClient";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;

  const raw = resolvedParams?.job_id;
  const jobId = Array.isArray(raw) ? raw[0] : raw;

  return <LoginClient jobId={jobId ?? null} />;
}