import { UseFormRegisterReturn } from 'react-hook-form'

export interface Button {
  name: string
  title: string
  children?: React.ReactNode
  submit?: boolean
  success?: boolean
  fnClick: () => void
}

export interface Input {
  name: string
  title: string
  placeholder?: string
  required?: boolean
  error?: string
}

export interface InputText extends Input {
  maskCpf?: boolean
  register?: UseFormRegisterReturn<any>
}

export interface InputNumber extends Input {
  register?: UseFormRegisterReturn<any>
}

export interface InputDate extends Input {
  register?: UseFormRegisterReturn<any>
}

export type OptionValue = string | number

export type SelectOption = {
  label: string
  value: OptionValue
}

export interface Select extends Input {
  options: SelectOption[]
  register?: UseFormRegisterReturn<any>
}
