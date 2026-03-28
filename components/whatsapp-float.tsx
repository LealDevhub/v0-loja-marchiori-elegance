"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5511972547572"
const WHATSAPP_MESSAGE = "Olá! Gostaria de saber mais sobre os produtos da Marchiori Elegance."

export function WhatsAppFloat() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <Link 
      href={whatsappLink}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 px-3 py-2 bg-primary text-gold text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
        Fale conosco!
      </span>
      
      {/* Pulse Animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
    </Link>
  )
}
