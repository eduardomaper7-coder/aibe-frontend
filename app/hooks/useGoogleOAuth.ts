'use client'
import { useEffect, useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_BASE ?? 'http://127.0.0.1:8001'
const FRONT = process.env.NEXT_PUBLIC_FRONTEND_ORIGIN ?? 'http://localhost:3000'

async function checkStatus(email: string) {
  const url = new URL('/auth/google/status', API)
  url.searchParams.set('email', email)
  const r = await fetch(url.toString(), { credentials: 'include' })
  if (!r.ok) return false
  const j = await r.json()
  return !!j.connected
}

export function useGoogleOAuth() {
  const [email, setEmail] = useState<string>(() => (typeof window !== 'undefined' ? localStorage.getItem('user_email') || '' : ''))
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  // Verificar al montar si ya está conectado
  useEffect(() => {
    let cancel = false
    ;(async () => {
      if (!email) return
      const ok = await checkStatus(email)
      if (!cancel) setIsConnected(ok)
    })()
    return () => { cancel = true }
  }, [email])

  // Abrir el pop-up y escuchar el postMessage
  const openGooglePopup = () => {
    setIsConnecting(true)
    const url = new URL('/auth/google/login', API)
    if (email) url.searchParams.set('email', email)

    const w = 500, h = 650
    const left = window.screenX + (window.outerWidth - w) / 2
    const top = window.screenY + (window.outerHeight - h) / 2
    window.open(url.toString(), 'google-oauth', `width=${w},height=${h},left=${left},top=${top},resizable,scrollbars`)
  }

  useEffect(() => {
    const handler = async (ev: MessageEvent) => {
      // Solo aceptar mensajes del propio front
      if (ev.origin !== FRONT) return
      if (!ev.data || ev.data.type !== 'oauth-complete') return
      setIsConnecting(false)

      if (ev.data.ok) {
        const em = (ev.data.email || '').toLowerCase()
        if (em) {
          localStorage.setItem('user_email', em)
          setEmail(em)
          const ok = await checkStatus(em)
          setIsConnected(ok)
        }
      } else {
        console.error('OAuth error:', ev.data.error)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  const verifyConnection = async () => {
    if (!email) return
    setIsConnected(await checkStatus(email))
  }

  return { email, setEmail, isConnected, isConnecting, openGooglePopup, verifyConnection }
}
