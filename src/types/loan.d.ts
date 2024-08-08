import { UserLoan } from './user'

export type Installment = {
  balanceDue: number
  interest: number
  value: number
  dueDate: Date
}

export type Loan = {
  amount: number
  percentMonthInterest: number
  wantToPayPerMonth: number
  installments: Installment[]
  totalInterest: number
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
