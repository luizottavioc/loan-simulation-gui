'use client'

import type { InputNumber } from '@/types/form'

export default function InputCurrency({
  name,
  title,
  placeholder,
  register,
  error,
}: InputNumber) {
  return (
    <div className="w-full">
      <input
        type="text"
        name={name}
        title={title}
        placeholder={placeholder}
        {...register}
        className="h-12 w-full rounded border border-zinc-400/50 bg-zinc-50 px-3 py-2 text-zinc-800 focus:outline-orange-400"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
