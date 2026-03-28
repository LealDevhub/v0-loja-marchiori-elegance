"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, ArrowRight } from "lucide-react"

const WHATSAPP_NUMBER = "5511972547572"
const WHATSAPP_MESSAGE = "Olá! Gostaria de fazer um pedido na Marchiori Elegance."

export function CTASection() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="py-20 lg:py-32 bg-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gold mb-6">
          Pronto para se Vestir com Elegância?
        </h2>
        <p className="text-gold/70 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Entre em contato pelo WhatsApp e receba atendimento personalizado. 
          Tire suas dúvidas, solicite orçamentos e faça seu pedido de forma rápida e segura.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            size="lg"
            className="bg-gold text-primary hover:bg-gold-light font-medium text-lg px-10 py-6"
          >
            <Link href={whatsappLink} target="_blank">
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>

        <p className="text-gold/50 text-sm mt-8">
          Atendimento de segunda a sábado, das 9h às 18h
        </p>
      </div>
    </section>
  )
}
