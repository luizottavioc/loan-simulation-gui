'use client'

import { useState } from 'react'
import { LoanMade } from '@/types/loan'

import LoanTitle from './loan-title'
import LoanForm from './loan-form'
import LoanSummary from './loan-summary'
import { postLoanMade } from '@/services/loan.service'

export default function Home() {
  const [loanMade, setLoanMade] = useState<LoanMade | null>(null)
  const [postLoanMessage, setPostLoanMessage] = useState<string | null>()

  const resetForm = () => {
    setLoanMade(null)
  }

  const postLoan = () => {
    if (!loanMade) return

    postLoanMade(loanMade, resetForm)
    setPostLoanMessage('Emprestimo efetuado com sucesso!')
  }

  return (
    <main className="flex h-svh w-svw flex-col items-center justify-start gap-16 p-4">
      <LoanTitle />
      <LoanForm
        postLoanMessage={postLoanMessage || null}
        setPostLoanMessage={setPostLoanMessage}
        setLoanMade={setLoanMade}
      />
      <LoanSummary loan={loanMade?.loan || null} postLoan={postLoan} />
    </main>
  )
}
