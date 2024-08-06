import { Loan, LoanFormInputs } from '@/types/loan'

export function calculateLoan({
  cpf,
  uf,
  dateBirth,
  loanAmountValue,
  loanInstallmentsValue,
}: LoanFormInputs): Loan {
  return {
    user: {
      cpf,
      uf,
      dateBirth: new Date(dateBirth),
    },
    amount: loanAmountValue,
    percentMonthTax: 0.02,
    wantToPayPerMonth: loanInstallmentsValue,
    installments: [],
    totalTax: 0,
  }
}
