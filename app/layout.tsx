import { CartProvider } from '@/lib/cart-context'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-serif'
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Marchiori Elegance | Gravatas e Camisas Sociais',
  description: 'Gravatas e camisas sociais de alta qualidade para congregações cristãs, casamentos e eventos sociais. Kits especiais para padrinhos e datas comemorativas.',
  generator: 'v0.app',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'Marchiori Elegance | Gravatas e Camisas Sociais',
    description: 'Gravatas e camisas sociais de alta qualidade para congregações cristãs, casamentos e eventos sociais.',
    images: ['/favicon.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${playfair.variable} ${inter.variable} font-sans antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
