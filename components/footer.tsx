"use client"

import Link from "next/link"
import { Instagram, MessageCircle, MapPin, Phone } from "lucide-react"

const WHATSAPP_NUMBER = "5511972547572"

export function Footer() {
  return (
    <footer className="bg-primary border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img 
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/D2B1BECA-2306-4126-A08F-35675C575A75.PNG-GPol9NfcjfzyAdoqFhV6CTOXA1kdg3.png" 
                alt="Marchiori Elegance" 
                className="h-16 w-auto"
              />
            </Link>
            <p className="text-gold/60 max-w-sm mb-6">
              Gravatas e camisas sociais de alta qualidade para quem busca elegância 
              e sofisticação em momentos especiais.
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://www.instagram.com/marchiorielegance/" 
                target="_blank"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold hover:bg-gold/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-medium text-gold mb-4">Navegação</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#gravatas" className="text-gold/60 hover:text-gold transition-colors text-sm">
                  Gravatas
                </Link>
              </li>
              <li>
                <Link href="#camisas" className="text-gold/60 hover:text-gold transition-colors text-sm">
                  Camisas
                </Link>
              </li>
              <li>
                <Link href="#kits" className="text-gold/60 hover:text-gold transition-colors text-sm">
                  Kits Especiais
                </Link>
              </li>
              <li>
                <Link href="#sobre" className="text-gold/60 hover:text-gold transition-colors text-sm">
                  Sobre
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium text-gold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gold/60 text-sm">
                <Phone className="w-4 h-4" />
                +55 11 97254-7572
              </li>
              <li className="flex items-center gap-2 text-gold/60 text-sm">
                <MapPin className="w-4 h-4" />
                São Paulo, Brasil
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-gold/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gold/40 text-sm">
            © {new Date().getFullYear()} Marchiori Elegance. Todos os direitos reservados.
          </p>
          <p className="text-gold/40 text-sm">
            Feito com elegância para você
          </p>
        </div>
      </div>
    </footer>
  )
}
