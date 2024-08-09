'use client'

export default function MessageApiError({
  message,
  setApiError,
}: {
  message: string
  setApiError: (apiError: string | null) => void
}) {
  return (
    <div className="relative w-full animate-show-fade-in rounded bg-zinc-500/10 p-2 px-6 text-center text-xs font-bold">
      {message}
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setApiError(null)}
      >
        x
      </button>
    </div>
  )
}
