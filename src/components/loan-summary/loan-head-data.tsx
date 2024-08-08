'use client'

export default function LoanHeadData({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="flex w-full animate-show-fade-in flex-col items-center justify-start gap-1 lg:items-start">
      <p className="text-xs font-bold text-zinc-500">{label}</p>
      <div className="text-lg font-bold">{value}</div>
    </div>
  )
}
