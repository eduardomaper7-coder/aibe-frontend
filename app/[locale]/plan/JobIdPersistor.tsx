"use client";

import { useEffect } from "react";

export default function JobIdPersistor({ jobId }: { jobId: string }) {
  useEffect(() => {
    if (jobId) localStorage.setItem("job_id", jobId);
  }, [jobId]);

  return null;
}