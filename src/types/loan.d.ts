import { UserLoan } from './user'

export type Installment = {
  balanceDue: number
  tax: number
  value: number
  dueDate: Date
}

export type Loan = {
  user: UserLoan
  amount: number
  percentMonthTax: number
  wantToPayPerMonth: number
  installments: Installment[]
  totalTax: number
}

export interface LoanFormInputs {
  cpf: string
  uf: number
  dateBirth: string
  loanAmountValue: number
  loanInstallmentsValue: number
}
