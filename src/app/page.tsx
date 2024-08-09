'use client'

import { useState } from 'react'
import { LoanMade } from '@/types/loan'

import LoanTitle from './loan/loan-title'
import LoanForm from './loan/loan-form'
import LoanSummary from './loan/loan-summary'
import { postLoanMade } from '@/services/loan.service'
import { ServiceException } from '@/utils/service-exception'

export default function Home() {
  const [loanMade, setLoanMade] = useState<LoanMade | null>(null)
  const [postLoanSuccess, setPostLoanSuccess] = useState<string | null>(null)
  const [postLoanError, setPostLoanError] = useState<string | null>(null)

  const resetForm = () => {
    setLoanMade(null)
  }

  const postLoan = async (): Promise<boolean> => {
    if (!loanMade) return false

    try {
      await postLoanMade(loanMade, resetForm)
      setPostLoanSuccess('Emprestimo efetuado com sucesso!')
    } catch (error) {
      setPostLoanError(
        error instanceof ServiceException
          ? error.message
          : 'Erro ao efetuar emprestimo. Tente novamente mais tarde!',
      )
      return false
    }

    return true
  }

  return (
    <main className="flex h-svh w-svw flex-col items-center justify-start gap-16 p-4">
      <LoanTitle />
      <LoanForm
        postLoanSuccess={postLoanSuccess || null}
        setPostLoanSuccess={setPostLoanSuccess}
        setLoanMade={setLoanMade}
      />
      <LoanSummary
        loan={loanMade?.loan || null}
        postLoan={postLoan}
        postLoanError={postLoanError || null}
        setPostLoanError={setPostLoanError}
      />
    </main>
  )
}
