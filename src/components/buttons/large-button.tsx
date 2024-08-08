'use client'

import { Button } from '@/types/form'

export default function LargeButton({
  name,
  title,
  fnClick,
  submit = false,
  children,
  success = false,
  neutral = false,
  disabled = false,
}: Button) {
  const onClick = () => !disabled && fnClick && fnClick()

  return (
    <button
      type={submit ? 'submit' : 'button'}
      name={name}
      title={title}
      className={`${'w-full rounded px-2 py-1.5 text-sm font-semibold tracking-widest text-zinc-50 shadow-sm transition-all'} ${!success && 'bg-orange-400 hover:bg-orange-500'} ${success && 'bg-green-500 hover:bg-green-600'} ${neutral && 'bg-zinc-500 hover:bg-zinc-600'} ${!disabled && 'cursor-pointer'} ${disabled && 'pointer-events-none opacity-50'} `}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
