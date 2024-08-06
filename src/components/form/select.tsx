'use client'

import type { Select } from '@/types/form'

export default function Select({
  name,
  title,
  placeholder,
  options,
  value,
  fnChange,
}: Select) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    fnChange(event.target.value)
  }

  return (
    <div className="w-full">
      <select
        title={title}
        className={`${value ? 'text-zinc-800' : 'text-zinc-950/50'} ${'h-12 w-full cursor-pointer rounded border border-zinc-400/50 bg-zinc-50 px-2 py-2.5 text-base text-zinc-800 placeholder:text-base focus:outline-orange-400'}`}
        value={value}
        name={name}
        id={name}
        onChange={handleChange}
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
    </div>
  )
}
