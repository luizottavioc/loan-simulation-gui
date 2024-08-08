import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
})

export const metadata: Metadata = {
  title: 'Solicite o seu Empréstimo',
  description:
    'Simule o seu empréstimo levando em consideração seu estado e as taxas de juros específicas da sua região.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${'overflow-x-hidden bg-zinc-100 text-zinc-950'}`}
      >
        {children}
      </body>
    </html>
  )
}
