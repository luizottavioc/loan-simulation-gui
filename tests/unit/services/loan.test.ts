import { expect, it } from 'vitest'

import { calculateLoan } from '../../../src/services/loan.service'
import { UF } from '../../../src/types/uf'
import { LoanFormInputs, LoanMade } from '../../../src/types/loan'

it('should calculate loan correctly', () => {
  const ufsInterest: UF[] = [
    { id: 1, name: 'Minas Gerais', acronym: 'MG', interestRate: 0.01 },
    { id: 2, name: 'Santa Catarina', acronym: 'SC', interestRate: 0.02 },
    { id: 3, name: 'Parana', acronym: 'PR', interestRate: 0.03 },
  ]

  const formData: LoanFormInputs = {
    cpf: '123456789',
    uf: 1,
    dateBirth: new Date('2022-01-01'),
    loanAmountValue: 6000000,
    loanInstallmentsValue: 1500000,
  }

  const loanMade: LoanMade = calculateLoan(formData, ufsInterest)

  expect(loanMade.loan.amount).toBe(6000000)
  expect(loanMade.loan.totalInterest).toBe(154552)
  expect(loanMade.loan.percentMonthInterest).toBe(0.01)
  expect(loanMade.loan.installments.length).toBe(5)

  expect(loanMade.user.cpf).toBe('123456789')
  expect(loanMade.user.uf).toBe(1)
  expect(loanMade.user.dateBirth).toEqual(new Date('2022-01-01'))

  expect(loanMade.loan.installments[0].value).toBe(1500000)
  expect(loanMade.loan.installments[1].value).toBe(1500000)
  expect(loanMade.loan.installments[2].value).toBe(1500000)
  expect(loanMade.loan.installments[3].value).toBe(1500000)
  expect(loanMade.loan.installments[4].value).toBe(154552)

  expect(loanMade.loan.installments[0].interest).toBe(60000)
  expect(loanMade.loan.installments[1].interest).toBe(45600)
  expect(loanMade.loan.installments[2].interest).toBe(31056)
  expect(loanMade.loan.installments[3].interest).toBe(16366)
  expect(loanMade.loan.installments[4].interest).toBe(1530)
})
