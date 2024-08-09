'use client'

export default function ModalContainer({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen animate-show-fade-in items-center justify-center bg-black/70 p-4">
      <div className="w-full rounded bg-zinc-50 p-4 py-8 shadow-lg lg:max-w-[50svw] lg:p-6">
        {children}
      </div>
    </div>
  )
}
