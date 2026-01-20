'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

export default function ProcesandoClient() {
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const url = searchParams.get('url')
    if (!url) return

    const analizar = async () => {
      const res = await fetch('/api/analizar', {
        method: 'POST',
        body: JSON.stringify({ url }),
      })

      const data = await res.json()

      // 👉 REDIRECCIÓN AL PANEL
      router.replace(`/panel/${data.id}`)
    }

    analizar()
  }, [searchParams, router])

  return null // no renderiza nada
}
