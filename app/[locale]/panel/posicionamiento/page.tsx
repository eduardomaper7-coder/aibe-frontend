import PosicionamientoClient from "./PosicionamientoClient";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ job_id?: string }>;
};

export default async function PosicionamientoPage({
  params,
  searchParams,
}: PageProps) {
  await params;
  const { job_id } = await searchParams;

  return <PosicionamientoClient jobId={job_id ?? null} />;
}