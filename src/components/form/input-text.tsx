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
    <div className="flex w-full flex-col">
      <input
        type="text"
        name={name}
        title={title}
        placeholder={placeholder}
        {...register}
        className={`${'h-12 w-full rounded border border-zinc-400/50 bg-zinc-50 px-3 py-2 text-base text-zinc-800 placeholder:text-base focus:outline-orange-400'} ${error ? 'border-red-500' : ''}`}
      />
      {error && (
        <p className="w-full animate-show-fade-in p-1 text-xs font-bold text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
