'use client'

export default function MessagePostLoanSuccess({
  message,
  setPostLoanSuccess,
}: {
  message: string
  setPostLoanSuccess: (postLoanMessage: string | null) => void
}) {
  return (
    <div className="relative w-full animate-show-fade-in rounded bg-green-500/10 p-2 px-6 text-center text-xs font-bold text-green-600">
      {message}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setPostLoanSuccess(null)}
      >
        x
      </button>
    </div>
  )
}
