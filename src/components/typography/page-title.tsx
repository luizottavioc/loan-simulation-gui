export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="font-sans text-4xl font-thin text-zinc-500">{children}</h1>
  )
}
