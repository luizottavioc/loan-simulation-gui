'use client'

import { getTextAsFormattedCurrency } from '@/services/form.service'
import { Installment } from '@/types/loan'

export default function LoanBodyTable({
  installments,
}: {
  installments: Installment[]
}) {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-8">
      <h1 className="w-full text-xs font-bold text-zinc-500">
        PROJEÇÃO DAS PARCELAS:
      </h1>
      <table className="w-full">
        <thead>
          <tr className="w-full border-b-2 border-zinc-400/50">
            <th className="p-1.5 text-left text-sm font-bold">SALDO DEVEDOR</th>
            <th className="p-1.5 text-left text-sm font-bold">JUROS</th>
            <th className="p-1.5 text-left text-sm font-bold">
              SALDO DEVEDOR AJUSTADO
            </th>
            <th className="p-1.5 text-left text-sm font-bold">
              VALOR DA PARCELA
            </th>
            <th className="p-1.5 text-left text-sm font-bold">VENCIMENTO</th>
          </tr>
        </thead>
        <tbody>
          {installments.map((installment) => (
            <tr
              key={installment.dueDate.getTime()}
              className="w-full border-b border-zinc-400/50"
            >
              <td className="p-2 py-3 text-xs font-medium">
                {getTextAsFormattedCurrency(String(installment.balanceDue))}
              </td>
              <td className="p-2 py-3 text-xs font-medium">
                {getTextAsFormattedCurrency(String(installment.tax))}
              </td>
              <td className="p-2 py-3 text-xs font-medium">
                {getTextAsFormattedCurrency(
                  String(installment.balanceDue + installment.tax),
                )}
              </td>
              <td className="p-2 py-3 text-xs font-medium">
                {getTextAsFormattedCurrency(String(installment.value))}
              </td>
              <td className="p-2 py-3 text-xs font-medium">
                {installment.dueDate.toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
