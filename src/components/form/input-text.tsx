'use client'

import { getTextAsFormattedCpf } from '@/services/form.service'
import type { InputText } from '@/types/form'

export default function InputText({
  name,
  title,
  placeholder,
  value,
  maskCpf,
  fnChange,
}: InputText) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (maskCpf) {
      const formattedValue = getTextAsFormattedCpf(event.target.value)
      fnChange(formattedValue)
      return
    }

    fnChange(event.target.value)
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
        className="h-12 w-full rounded border border-zinc-400/50 bg-zinc-50 px-3 py-2 text-base text-zinc-800 placeholder:text-base focus:outline-orange-400"
      />
    </div>
  )
}
