export interface Button {
  name: string
  title: string
  children?: React.ReactNode
  success?: boolean
  fnClick: () => void
}

export interface Input {
  name: string
  title: string
  placeholder?: string
  required?: boolean
}

export interface InputText extends Input {
  value?: string
  maskCpf?: boolean
  fnChange: (value: string) => void
}

export interface InputDate extends Input {
  value?: string
  fnChange: (value: string) => void
}

export type OptionValue = string | number

export type SelectOption = {
  label: string
  value: OptionValue
}

export interface Select extends Input {
  options: SelectOption[]
  value?: OptionValue
  fnChange: (value: string) => void
}
