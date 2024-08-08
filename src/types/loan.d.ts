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
  dateBirth: Date
  loanAmountValue: number
  loanInstallmentsValue: number
}

export interface PostInstallmentContract {
  balanceDue: number
  interest: number
  value: number
  dueDate: string
}

export interface PostLoanContract {
  clientCPF: string
  clientDateOfBirth: string
  ufId: number
  amount: number
  percentMonthInterest: number
  wantToPayPerMonth: number
  totalInterest: number
  installments: PostInstallmentContract[]
}

export interface PostLoanResponse {
  id: number
  clientCPF: string
  clientDateOfBirth: string
  ufId: number
  amount: number
  percentMonthInterest: number
  wantToPayPerMonth: number
  totalInterest: number
  updatedAt: string
  createdAt: string
}
