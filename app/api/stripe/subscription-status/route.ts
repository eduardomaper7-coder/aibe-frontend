import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const VALID_STATUSES = new Set(['trialing', 'active', 'past_due'])

async function checkByEmail(email: string) {
  const customers = await stripe.customers.list({ email, limit: 100 })
  if (customers.data.length === 0) {
    return { active: false, status: null, subscriptionId: null }
  }
  for (const c of customers.data) {
    const subs = await stripe.subscriptions.list({ customer: c.id, status: 'all', limit: 20 })
    subs.data.sort((a, b) => (b.created || 0) - (a.created || 0))
    const current = subs.data.find(s => VALID_STATUSES.has(s.status))
    if (current) return { active: true, status: current.status, subscriptionId: current.id }
  }
  return { active: false, status: null, subscriptionId: null }
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json()
    if (!email) return NextResponse.json({ error: 'Falta email' }, { status: 400 })
    const result = await checkByEmail(String(email).toLowerCase())
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error comprobando suscripción' }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const email = new URL(req.url).searchParams.get('email')
    if (!email) return NextResponse.json({ error: 'Falta email' }, { status: 400 })
    const result = await checkByEmail(String(email).toLowerCase())
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Error comprobando suscripción' }, { status: 500 })
  }
}


