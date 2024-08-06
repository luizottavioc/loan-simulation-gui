'use client'

import type { InputText } from '@/types/form'

export default function InputText({
  name,
  title,
  placeholder,
  register,
  error,
}: InputText) {
  return (
    <div className="w-full">
      <input
        type="text"
        name={name}
        title={title}
        placeholder={placeholder}
        {...register}
        className="h-12 w-full rounded border border-zinc-400/50 bg-zinc-50 px-3 py-2 text-base text-zinc-800 placeholder:text-base focus:outline-orange-400"
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
