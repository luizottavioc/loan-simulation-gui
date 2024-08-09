import {
  Installment,
  Loan,
  LoanFormInputs,
  LoanMade,
  PostInstallmentContract,
  PostLoanContract,
  PostLoanResponse,
} from '@/types/loan'
import { UserLoan } from '@/types/user'
import { ServiceException } from '@/utils/service-exception'

import { addMonths, format } from 'date-fns'
import { getTextAsFormattedCurrency } from './form.service'
import { UF } from '@/types/uf'
import http from './http.service'

const MIN_LOAN_AMOUNT = 5000000
const MIN_INSTALLMENT_PERCENT = 0.01

export function calculateLoan(
  formData: LoanFormInputs,
  ufsInterest: UF[],
): LoanMade {
  const { cpf, uf, dateBirth, loanAmountValue, loanInstallmentsValue } =
    formData

  const loan = resolveLoan({
    loanAmountValue,
    loanInstallmentsValue,
    uf,
    ufsInterest,
  })

  const user = resolveUserLoan({ cpf, uf, dateBirth })

  return { user, loan }
}

export function resolveUserLoan({
  cpf,
  uf,
  dateBirth,
}: {
  cpf: string
  uf: number
  dateBirth: Date
}): UserLoan {
  if (!cpf || !uf || !dateBirth) {
    throw new ServiceException('Erro ao resolver dados do usuário.')
  }

  if (dateBirth > new Date()) {
    throw new ServiceException('Data de nascimento inválida.')
  }

  return { cpf, uf, dateBirth }
}

export function resolveLoan({
  loanAmountValue,
  loanInstallmentsValue,
  uf,
  ufsInterest,
}: {
  loanAmountValue: number
  loanInstallmentsValue: number
  uf: number
  ufsInterest: UF[]
}): Loan {
  checkLoanValues(loanAmountValue, loanInstallmentsValue)

  const interest = getLoanInterestByUf(uf, ufsInterest)
  if (!interest) {
    throw new ServiceException(
      'Não é possível realizar empréstimos no estado selecionado.',
    )
  }

  const loan = getLoan({
    loanAmountValue,
    loanInstallmentsValue,
    interest,
  })

  return loan
}

export function checkUfValues(uf: number, ufsInterest: UF[]): void {
  if (!uf || uf < 0 || !ufsInterest) {
    throw new ServiceException('Erro ao resolver dados do empréstimo.')
  }

  if (!ufsInterest.find((interest) => interest.id === uf)) {
    throw new ServiceException(
      'Não é possível realizar empréstimos no estado selecionado.',
    )
  }
}

export function checkLoanValues(
  loanAmountValue: number,
  loanInstallmentsValue: number,
): void {
  if (!loanAmountValue || !loanInstallmentsValue) {
    throw new ServiceException('Erro ao resolver dados do empréstimo.')
  }

  if (loanAmountValue < 0 || loanInstallmentsValue < 0) {
    throw new ServiceException('Os valores do empréstimo são inválidos.')
  }

  if (loanAmountValue < MIN_LOAN_AMOUNT) {
    throw new ServiceException(
      `Valor mínimo para empréstimo: ${getTextAsFormattedCurrency(String(MIN_LOAN_AMOUNT))}.`,
    )
  }

  const percentOfInstallment = loanInstallmentsValue / loanAmountValue
  if (percentOfInstallment < MIN_INSTALLMENT_PERCENT) {
    const minValue = MIN_INSTALLMENT_PERCENT * loanAmountValue
    throw new ServiceException(
      `Valor mínimo da parcela mensal: ${getTextAsFormattedCurrency(String(minValue))} (${MIN_INSTALLMENT_PERCENT * 100}% do valor do empréstimo desejado).`,
    )
  }
}

export function getLoanInterestByUf(uf: number, ufsInterest: UF[]): number {
  if (!uf || uf < 0 || !ufsInterest) {
    throw new ServiceException('Erro ao resolver dados do empréstimo.')
  }

  const interest = ufsInterest.find(
    (interest) => interest.id === uf,
  )?.interestRate
  if (interest === undefined) {
    throw new ServiceException(
      'Não é possível realizar empréstimos no estado selecionado.',
    )
  }

  return interest
}

export function getLoan({
  loanAmountValue,
  loanInstallmentsValue,
  interest,
}: {
  loanAmountValue: number
  loanInstallmentsValue: number
  interest: number
}): Loan {
  const installments: Installment[] = []

  do {
    const lastInstallment =
      installments[installments.length - 1] || ({} as Installment)
    const newInstallment = getInstallmentByLastInstallment(
      lastInstallment,
      loanAmountValue,
      loanInstallmentsValue,
      interest,
    )

    if (newInstallment.balanceDue <= 0) break

    if (newInstallment.interest >= newInstallment.value) {
      throw new ServiceException(
        'O valor das parcelas é menor do que a incidência dos juros, portanto o emprestimo não pode ser realizado.',
      )
    }

    installments.push(newInstallment)
  } while (installments[installments.length - 1]?.balanceDue > 0)

  const totalInterest = installments.reduce(
    (total: number, installment: Installment) => total + installment.interest,
    0,
  )

  return {
    amount: loanAmountValue,
    percentMonthInterest: interest,
    wantToPayPerMonth: loanInstallmentsValue,
    installments,
    totalInterest,
  }
}

export function getInstallmentByLastInstallment(
  lastInstallment: Installment,
  loanAmountValue: number,
  loanInstallmentsValue: number,
  interest: number,
): Installment {
  const lastBalanceDue =
    lastInstallment.balanceDue + lastInstallment.interest || loanAmountValue
  const newBalanceDue = lastBalanceDue - (lastInstallment.value || 0)

  const interestValue = Math.floor(newBalanceDue * interest)
  const valueToPayOff = newBalanceDue + interestValue

  const newInstallmentValue =
    valueToPayOff > loanInstallmentsValue
      ? loanInstallmentsValue
      : valueToPayOff

  const dueDate = !lastInstallment.dueDate
    ? new Date()
    : addMonths(lastInstallment.dueDate, 1)

  return {
    balanceDue: newBalanceDue,
    interest: interestValue,
    value: newInstallmentValue,
    dueDate,
  }
}

export async function postLoanMade(
  loanMade: LoanMade,
  resetFormData: () => void,
): Promise<void> {
  if (!loanMade) {
    throw new ServiceException('Erro ao efetivar empréstimo.')
  }

  const endpointPostLoan = '/loan'
  const body = treatLoanDataToPost(loanMade)
  const response: PostLoanResponse[] | null = await http
    .post(endpointPostLoan, body)
    .then((response) => {
      const { data } = response
      if (!data) {
        throw new ServiceException('Erro ao efetivar empréstimo.')
      }

      return data as PostLoanResponse[]
    })
    .catch(() => null)

  if (response === null) {
    throw new ServiceException(
      'Erro ao efetivar empréstimo. Tente novamente mais tarde.',
    )
  }

  resetFormData()
}

export function treatLoanDataToPost(loanMade: LoanMade): PostLoanContract {
  const installments: PostInstallmentContract[] =
    loanMade.loan.installments.map((installment) => ({
      balanceDue: installment.balanceDue,
      interest: installment.interest,
      value: installment.value,
      dueDate: format(installment.dueDate, 'yyyy-MM-dd'),
    }))

  const body: PostLoanContract = {
    clientCPF: loanMade.user.cpf,
    clientDateOfBirth: loanMade.user.dateBirth.toISOString(),
    ufId: loanMade.user.uf,
    amount: loanMade.loan.amount,
    percentMonthInterest: loanMade.loan.percentMonthInterest,
    wantToPayPerMonth: loanMade.loan.wantToPayPerMonth,
    totalInterest: loanMade.loan.totalInterest,
    installments,
  }

  return body
}
