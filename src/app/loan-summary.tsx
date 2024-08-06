'use client'

import { Loan } from '@/types/loan'
import { getTextAsFormattedCurrency } from '@/services/form.service'

import PageSubTitle from '@/components/typography/page-subtitle'
import LoanHeadData from '@/components/loan-summary/loan-head-data'
import LoanBodyTable from '@/components/loan-summary/loan-body-table'
import LargeButton from '@/components/buttons/large-button'

export default function LoanSummary({
  amount,
  percentMonthTax,
  wantToPayPerMonth,
  installments,
  totalTax,
}: Loan) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 lg:min-w-[850px] lg:max-w-[50svw]">
      <PageSubTitle>
        Veja a simulação para o seu empréstimo antes de efetivar
      </PageSubTitle>
      <div className="flex w-full flex-col items-center justify-center gap-4 rounded bg-zinc-50 p-4 py-8 shadow-md lg:gap-12 lg:p-6">
        <div className="flex w-full flex-col items-center justify-center gap-4 lg:grid lg:grid-cols-3 lg:gap-8">
          <LoanHeadData
            label="VALOR REQUERIDO:"
            value={getTextAsFormattedCurrency(String(amount))}
          />
          <LoanHeadData
            label="TAXA DE JUROS:"
            value={`${percentMonthTax * 100}% ao mês`}
          />
          <LoanHeadData
            label="VALOR QUE DESEJA PAGAR POR MÊS:"
            value={getTextAsFormattedCurrency(String(wantToPayPerMonth))}
          />
          <LoanHeadData
            label="TOTAL DE MESES PARA QUITAR:"
            value={`${installments.length} MESES`}
          />
          <LoanHeadData
            label="TOTAL DE JUROS:"
            value={getTextAsFormattedCurrency(String(totalTax))}
          />
          <LoanHeadData
            label="TOTAL A PAGAR:"
            value={getTextAsFormattedCurrency(String(amount + totalTax))}
          />
        </div>
        <LoanBodyTable installments={installments} />
        <div className="w-full lg:w-1/2">
          <LargeButton
            name="submit-loan"
            title="Efetivar"
            success
            fnClick={() => {}}
          >
            EFETIVAR EMPRESTIMO
          </LargeButton>
        </div>
      </div>
    </div>
  )
}
