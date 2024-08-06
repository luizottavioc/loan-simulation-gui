'use client'

import type { InputDate } from '@/types/form'

export default function InputDate({
  name,
  title,
  placeholder,
  value,
  fnChange,
}: InputDate) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    fnChange(event.target.value)
  }

  return (
    <div className="w-full">
      <input
        type="date"
        title={title}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="h-12 w-full rounded border border-zinc-400/50 bg-zinc-50 px-3 py-2 text-base text-zinc-800 placeholder:text-base focus:outline-orange-400"
      />
    </div>
  )
}
