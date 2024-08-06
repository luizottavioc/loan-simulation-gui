'use client'

import { useState } from 'react'
import { Loan } from '@/types/loan'

import LoanTitle from './loan-title'
import LoanForm from './loan-form'
import LoanSummary from './loan-summary'

export default function Home() {
  const [loan, setLoan] = useState<Loan | null>(null)

  return (
    <main className="flex h-svh w-svw flex-col items-center justify-start gap-16 p-4">
      <LoanTitle />
      <LoanForm setLoan={setLoan} />
      <LoanSummary loan={loan} />
    </main>
  )
}
