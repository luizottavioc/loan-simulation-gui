'use client'

import { getTextAsFormattedCurrency } from '@/services/form.service'
import type { InputText } from '@/types/form'

export default function InputCurrency({
  name,
  title,
  placeholder,
  value,
  fnChange,
}: InputText) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = getTextAsFormattedCurrency(event.target.value)
    fnChange(formattedValue)
  }

  return (
    <div className="w-full">
      <input
        type="text"
        title={title}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="h-12 w-full rounded border border-zinc-400/50 bg-zinc-50 px-3 py-2 text-zinc-800 focus:outline-orange-400"
      />
    </div>
  )
}
