import { Suspense } from 'react'
import ProcesandoClient from './ProcesandoClient'

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <ProcesandoClient />
    </Suspense>
  )
}

function Loader() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <h1>Analizando reseñas…</h1>
      <p>Estamos procesando la información de tu negocio</p>
    </div>
  )
}
