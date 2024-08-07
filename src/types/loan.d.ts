import { UserLoan } from './user'

export type Installment = {
  balanceDue: number
  tax: number
  value: number
  dueDate: Date
}

export type Loan = {
  amount: number
  percentMonthTax: number
  wantToPayPerMonth: number
  installments: Installment[]
  totalTax: number
}

export type LoanMade = {
  user: UserLoan
  loan: Loan
}

export interface LoanFormInputs {
  cpf: string
  uf: number
  dateBirth: string
  loanAmountValue: number
  loanInstallmentsValue: number
}
