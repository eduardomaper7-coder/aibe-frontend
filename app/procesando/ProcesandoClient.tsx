'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ProcesandoClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const url = searchParams.get('url')
    if (!url) return

    const run = async () => {
      const res = await fetch("/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          google_maps_url: url,
          max_reviews: 99999,
          personal_data: true,
        }),
      })

      if (!res.ok) {
        throw new Error("Error haciendo scrape")
      }

      const data = await res.json() // { job_id }

      localStorage.setItem("jobId", String(data.job_id))

      // 👉 salto final al panel
      router.replace(`/panel/${data.job_id}`)
    }

    run()
  }, [searchParams, router])

  return null
}
