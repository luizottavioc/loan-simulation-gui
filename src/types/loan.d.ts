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
