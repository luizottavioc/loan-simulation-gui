'use client'

import ModalContainer from '../modal/modal-container'
import LargeButton from '../buttons/large-button'
import MsgPostLoanError from '../loan-summary/msg-post-loan-error'

import { getTextAsFormattedCurrency } from '@/services/form.service'
import { Loan } from '@/types/loan'
import { useState } from 'react'

export default function ModalConfirmLoan({
  loan,
  postLoan,
  closeModal,
  postLoanError,
  setPostLoanError,
}: {
  loan: Loan
  postLoan: () => Promise<boolean>
  closeModal: () => void
  postLoanError: string | null
  setPostLoanError: (message: string | null) => void
}) {
  const [loading, setLoading] = useState(false)

  return (
    <ModalContainer>
      <div className="flex w-full flex-col items-center justify-center gap-4">
        <h1 className="text-center text-xl font-bold">
          Você tem certeza que deseja efetivar o emprestimo no valor de{' '}
          <em className="not-italic text-green-600">{`${getTextAsFormattedCurrency(String(loan.amount))}`}</em>
          ?
        </h1>
        {postLoanError && (
          <MsgPostLoanError
            message={postLoanError}
            setPostLoanError={setPostLoanError}
          />
        )}
        <ol className="w-full rounded-md border p-2 px-4 shadow-md lg:max-w-[40svw]">
          <li className="flex justify-between border-b p-1">
            <b>Valor:</b> {getTextAsFormattedCurrency(String(loan.amount))}
          </li>
          <li className="flex justify-between border-b p-1">
            <b>Número de parcelas:</b> {loan.installments.length}
          </li>
          <li className="flex justify-between border-b p-1">
            <b>Valor da parcela:</b>{' '}
            {getTextAsFormattedCurrency(String(loan.wantToPayPerMonth))}
          </li>
          <li className="flex justify-between border-b p-1">
            <b>Taxa de juros mensal:</b>{' '}
            {(loan.percentMonthInterest * 100).toFixed(2)}%
          </li>
          <li className="flex justify-between p-1">
            <b>Total a pagar:</b>{' '}
            {getTextAsFormattedCurrency(
              String(loan.amount + loan.totalInterest),
            )}
          </li>
        </ol>
        <div className="mt-4 flex w-full flex-col gap-2 lg:max-w-[50svw]">
          <LargeButton
            name="submit-loan"
            title="Efetivar"
            success
            disabled={loading}
            fnClick={async () => {
              setLoading(true)
              const postLoanResult = await postLoan()
              if (postLoanResult) closeModal()
              setLoading(false)
            }}
          >
            EFETIVAR EMPRESTIMO
          </LargeButton>
          <LargeButton
            name="submit-loan"
            title="Efetivar"
            neutral
            disabled={loading}
            fnClick={() => closeModal()}
          >
            CANCELAR
          </LargeButton>
        </div>
      </div>
    </ModalContainer>
  )
}
