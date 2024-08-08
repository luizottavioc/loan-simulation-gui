import { Loan } from '@/types/loan'
import { getTextAsFormattedCurrency } from '@/services/form.service'

import PageSubTitle from '@/components/typography/page-subtitle'
import LoanHeadData from '@/components/loan-summary/loan-head-data'
import LoanBodyTable from '@/components/loan-summary/loan-body-table'
import LargeButton from '@/components/buttons/large-button'
import ModalConfirmLoan from '@/components/loan-summary/modal-confirm-loan'
import { useState } from 'react'

export default function LoanSummary({
  loan,
  postLoan,
}: {
  loan: Loan | null
  postLoan: () => void
}) {
  const [showModalConfirm, setShowModalConfirm] = useState(false)

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-4 pb-4 lg:min-w-[850px] lg:max-w-[50svw]">
        <PageSubTitle>
          Veja a simulação para o seu empréstimo antes de efetivar
        </PageSubTitle>
        <div className="flex w-full flex-col items-center justify-center gap-8 rounded bg-zinc-50 p-4 py-8 shadow-md lg:gap-12 lg:p-6">
          {loan && (
            <>
              <div className="flex w-full flex-col items-center justify-center gap-8 md:grid md:grid-cols-2 lg:grid lg:grid-cols-3">
                <LoanHeadData
                  label="VALOR REQUERIDO:"
                  value={getTextAsFormattedCurrency(String(loan.amount))}
                />
                <LoanHeadData
                  label="TAXA DE JUROS:"
                  value={`${(loan.percentMonthInterest * 100).toFixed(2)}% ao mês`}
                />
                <LoanHeadData
                  label="VALOR QUE DESEJA PAGAR POR MÊS:"
                  value={getTextAsFormattedCurrency(
                    String(loan.wantToPayPerMonth),
                  )}
                />
                <LoanHeadData
                  label="TOTAL DE MESES PARA QUITAR:"
                  value={`${loan.installments.length} MESES`}
                />
                <LoanHeadData
                  label="TOTAL DE JUROS:"
                  value={getTextAsFormattedCurrency(String(loan.totalInterest))}
                />
                <LoanHeadData
                  label="TOTAL A PAGAR:"
                  value={getTextAsFormattedCurrency(
                    String(loan.amount + loan.totalInterest),
                  )}
                />
              </div>
              <div className="w-full">
                <LoanBodyTable installments={loan.installments} />
              </div>
              <div className="w-full lg:w-1/2">
                <LargeButton
                  name="submit-loan"
                  title="Efetivar"
                  success
                  fnClick={() => setShowModalConfirm(true)}
                >
                  EFETIVAR EMPRESTIMO
                </LargeButton>
              </div>
            </>
          )}
          {!loan && (
            <p className="w-full text-center text-xs font-semibold text-zinc-500">
              Formulário não preenchido.
            </p>
          )}
        </div>
      </div>
      {loan && showModalConfirm && (
        <ModalConfirmLoan
          loan={loan}
          postLoan={() => postLoan()}
          closeModal={() => setShowModalConfirm(false)}
        />
      )}
    </>
  )
}
