import { Suspense } from 'react'
import ProcesandoClient from './ProcesandoClient'

export default function Page() {
  return (
    <Suspense fallback={<ProcesandoUI />}>
      <ProcesandoClient />
    </Suspense>
  )
}

function ProcesandoUI() {
  return (
    <div>
      <h1>Analizando reseñas...</h1>
      <p>Esto tarda unos segundos</p>
    </div>
  )
}
