'use client'

import { getTextAsFormattedCurrency } from '@/services/form.service'
import LargeButton from '../buttons/large-button'
import { Loan } from '@/types/loan'

export default function ModalConfirmLoan({
  loan,
  postLoan,
  closeModal,
}: {
  loan: Loan
  postLoan: () => void
  closeModal: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-show-fade-in items-center justify-center bg-black/70 p-4">
      <div className="w-full rounded bg-zinc-50 p-4 py-8 shadow-md lg:max-w-[50svw] lg:p-6">
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <p className="text-center text-xl font-bold">
            Deseja realmente efetivar o emprestimo de{' '}
            <b>{`${getTextAsFormattedCurrency(String(loan.amount))}?`}</b>
          </p>
          <div className="flex w-full flex-col gap-2">
            <LargeButton
              name="submit-loan"
              title="Efetivar"
              success
              fnClick={() => postLoan()}
            >
              EFETIVAR EMPRESTIMO
            </LargeButton>
            <LargeButton
              name="submit-loan"
              title="Efetivar"
              neutral
              fnClick={() => closeModal()}
            >
              CANCELAR
            </LargeButton>
          </div>
        </div>
      </div>
    </div>
  )
}
