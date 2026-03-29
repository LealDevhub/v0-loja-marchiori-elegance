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
    icon: [
      {
        url: 'https://instagram.fcgh19-1.fna.fbcdn.net/v/t51.82787-19/561960331_17842352019599119_4075527416018453761_n.jpg?',
      }
    ],
    apple: '/apple-icon.png',
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
