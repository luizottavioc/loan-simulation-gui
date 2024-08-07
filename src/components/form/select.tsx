'use client'

import type { Select } from '@/types/form'

export default function Select({
  name,
  title,
  placeholder,
  options,
  register,
  error,
}: Select) {
  return (
    <div className="flex w-full flex-col">
      <select
        name={name}
        title={title}
        className={`${'h-12 w-full cursor-pointer rounded border border-zinc-400/50 bg-zinc-50 px-2 py-2.5 text-base text-zinc-800 placeholder:text-base focus:outline-orange-400'} ${error ? 'border-red-500' : ''}`}
        {...register}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-zinc-950"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="w-full animate-show-fade-in p-1 text-xs font-bold text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}
