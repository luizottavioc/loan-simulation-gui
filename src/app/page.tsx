'use client'

import LoanTitle from './loan-title'
import LoanForm from './loan-form'
import LoanSummary from './loan-summary'

export default function Home() {
  return (
    <main className="flex h-svh w-svw flex-col items-center justify-start gap-16 p-4">
      <LoanTitle />
      <LoanForm />
      <LoanSummary
        amount={50000}
        percentMonthTax={0.01}
        wantToPayPerMonth={50000}
        installments={[
          {
            balanceDue: 50000,
            dueDate: new Date(),
            tax: 100,
            value: 50100,
          },
        ]}
        totalTax={100}
      />
    </main>
  )
}
