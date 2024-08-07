import { Installment, Loan, LoanFormInputs, LoanMade } from '@/types/loan'
import { UserLoan } from '@/types/user'
import { ServiceException } from '@/utils/service-exception'

import { addMonths, parse } from 'date-fns'
import { getTextAsFormattedCurrency } from './form.service'

import taxes from '@/data/taxes.json'

const MIN_LOAN_AMOUNT = 5000000
const MIN_INSTALLMENT_PERCENT = 0.01

export async function calculateLoan({
  cpf,
  uf,
  dateBirth,
  loanAmountValue,
  loanInstallmentsValue,
}: LoanFormInputs): Promise<LoanMade> {
  const loan = await resolveLoan({ loanAmountValue, loanInstallmentsValue, uf })
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
  dateBirth: string
}): UserLoan {
  if (!cpf || !uf || !dateBirth) {
    throw new ServiceException('Erro ao resolver dados do usuário.')
  }

  const birth = parse(dateBirth, 'dd/MM/yyyy', new Date())
  if (!birth) {
    throw new ServiceException(
      'Erro ao resolver data de nascimento do usuário.',
    )
  }

  return { cpf, uf, dateBirth: birth }
}

export async function resolveLoan({
  loanAmountValue,
  loanInstallmentsValue,
  uf,
}: {
  loanAmountValue: number
  loanInstallmentsValue: number
  uf: number
}): Promise<Loan> {
  checkLoanValues(loanAmountValue, loanInstallmentsValue)

  const tax = await requestLoanTaxByUf(uf)
  if (!tax) {
    throw new ServiceException(
      'Não é possível realizar empréstimos no estado selecionado.',
    )
  }

  const loan = getLoan({
    loanAmountValue,
    loanInstallmentsValue,
    tax,
  })

  return loan
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

export async function requestLoanTaxByUf(uf: number): Promise<number | false> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return taxes.find((tax) => tax.idUf === uf)?.tax || false
}

export function getLoan({
  loanAmountValue,
  loanInstallmentsValue,
  tax,
}: {
  loanAmountValue: number
  loanInstallmentsValue: number
  tax: number
}): Loan {
  const installments: Installment[] = []

  do {
    const lastInstallment =
      installments[installments.length - 1] || ({} as Installment)
    const newInstallment = getInstallmentByLastInstallment(
      lastInstallment,
      loanAmountValue,
      loanInstallmentsValue,
      tax,
    )

    if (newInstallment.balanceDue <= 0) break

    installments.push(newInstallment)
  } while (installments[installments.length - 1]?.balanceDue > 0)

  const totalTax = installments.reduce(
    (total: number, installment: Installment) => total + installment.tax,
    0,
  )

  return {
    amount: loanAmountValue,
    percentMonthTax: tax,
    wantToPayPerMonth: loanInstallmentsValue,
    installments,
    totalTax,
  }
}

export function getInstallmentByLastInstallment(
  lastInstallment: Installment,
  loanAmountValue: number,
  loanInstallmentsValue: number,
  tax: number,
): Installment {
  const lastBalanceDue =
    lastInstallment.balanceDue + lastInstallment.tax || loanAmountValue
  const newBalanceDue = lastBalanceDue - (lastInstallment.value || 0)

  const taxValue = Math.floor(newBalanceDue * tax)
  const valueToPayOff = newBalanceDue + taxValue

  const newInstallmentValue =
    valueToPayOff > loanInstallmentsValue
      ? loanInstallmentsValue
      : valueToPayOff

  const dueDate = !lastInstallment.dueDate
    ? new Date()
    : addMonths(lastInstallment.dueDate, 1)

  return {
    balanceDue: newBalanceDue,
    tax: taxValue,
    value: newInstallmentValue,
    dueDate,
  }
}
