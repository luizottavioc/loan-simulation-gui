'use client'

import SpinnerLoading from '@/components/spinner/spinner-loading'

export default function MessageApiError() {
  return (
    <div className="relative flex w-full animate-show-fade-in items-center justify-center gap-2 rounded bg-zinc-500/10 p-2 px-6 text-center text-xs font-bold">
      <SpinnerLoading />
      Carregando Informações do Servidor...
    </div>
  )
}
