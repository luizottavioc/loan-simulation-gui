'use client'

export default function MessageApiError({
  message,
  setPostLoanError,
}: {
  message: string
  setPostLoanError: (apiError: string | null) => void
}) {
  return (
    <div className="relative w-full animate-show-fade-in rounded bg-red-500/10 p-2 px-6 text-center text-xs font-bold text-red-600">
      {message}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setPostLoanError(null)}
      >
        x
      </button>
    </div>
  )
}
