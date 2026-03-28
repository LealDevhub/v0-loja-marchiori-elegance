"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Instagram, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

const WHATSAPP_NUMBER = "5511972547572"
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os produtos da Marchiori Elegance."

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img 
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/D2B1BECA-2306-4126-A08F-35675C575A75.PNG-GPol9NfcjfzyAdoqFhV6CTOXA1kdg3.png" 
              alt="Marchiori Elegance" 
              className="h-10 md:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#gravatas" className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide">
              Gravatas
            </Link>
            <Link href="/#camisas" className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide">
              Camisas
            </Link>
            <Link href="/#kits" className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide">
              Kits Especiais
            </Link>
            <Link href="/#sobre" className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide">
              Sobre
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="https://www.instagram.com/marchiorielegance/" 
              target="_blank"
              className="text-gold hover:text-gold-light transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </Link>
            <Link 
              href="/carrinho"
              className="text-gold hover:text-gold-light transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <Button 
              asChild
              className="bg-gold text-primary hover:bg-gold-light font-medium"
            >
              <Link href={whatsappLink} target="_blank">
                Fale Conosco
              </Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <Link 
              href="/carrinho"
              className="text-gold hover:text-gold-light transition-colors relative p-2"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-gold text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <button 
              className="text-gold p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold/20">
            <nav className="flex flex-col gap-4">
              <Link 
                href="/#gravatas" 
                className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Gravatas
              </Link>
              <Link 
                href="/#camisas" 
                className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Camisas
              </Link>
              <Link 
                href="/#kits" 
                className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Kits Especiais
              </Link>
              <Link 
                href="/#sobre" 
                className="text-gold hover:text-gold-light transition-colors text-sm font-medium tracking-wide py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <div className="flex items-center gap-4 pt-4 border-t border-gold/20">
                <Link 
                  href="https://www.instagram.com/marchiorielegance/" 
                  target="_blank"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Button 
                  asChild
                  className="bg-gold text-primary hover:bg-gold-light font-medium flex-1"
                >
                  <Link href={whatsappLink} target="_blank">
                    Fale Conosco
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
