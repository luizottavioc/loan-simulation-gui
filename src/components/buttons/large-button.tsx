'use client'

import { Button } from '@/types/form'

export default function LargeButton({
  name,
  title,
  fnClick,
  children,
  success = false,
}: Button) {
  return (
    <button
      type="button"
      name={name}
      title={title}
      className={`${'w-full rounded bg-orange-400 px-2 py-1.5 text-sm font-semibold tracking-widest text-zinc-50 shadow-sm transition-colors hover:bg-orange-500'} ${success && 'bg-green-500 hover:bg-green-600'}`}
      onClick={fnClick}
    >
      {children}
    </button>
  )
}
