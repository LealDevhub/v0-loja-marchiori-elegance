"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const WHATSAPP_NUMBER = "5511972547572"
const WHATSAPP_MESSAGE = "Olá! Gostaria de conhecer a coleção da Marchiori Elegance."

export function Hero() {
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <section className="relative min-h-screen bg-primary flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a227' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-6">
              <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
                Vista-se com Propósito
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-gold leading-tight mb-6">
              <span className="block">Elegância que</span>
              <span className="block text-gold-light">Inspira Confiança</span>
            </h1>
            <p className="text-gold/70 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Gravatas e camisas sociais de alta qualidade para momentos especiais. 
              Perfeitas para congregações, casamentos e eventos que merecem o seu melhor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild
                size="lg"
                className="bg-gold text-primary hover:bg-gold-light font-medium text-base px-8"
              >
                <Link href={whatsappLink} target="_blank">
                  Comprar pelo WhatsApp
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                size="lg"
                className="border-gold text-gold hover:bg-gold/10 font-medium text-base px-8"
              >
                <Link href="#gravatas">
                  Ver Coleção
                </Link>
              </Button>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden border border-gold/20">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2343-UPsWvsTbwwihs8FpErODzGIh9wm0RB.jpg"
                    alt="Gravata Azul Royal"
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden border border-gold/20">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2346-tbXE1oPPwWAafnP5ZtsrEWE3Q5lKPm.jpg"
                    alt="Gravata Vermelha"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-lg overflow-hidden border border-gold/20">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2332-pS44O1CDSmaKPOVyfEWyfor1Nee3ax.jpg"
                    alt="Gravata Verde Paisley"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden border border-gold/20">
                  <img 
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2007%20%281%29-9VlnXvNYsGnaK8hAhHXRVmhPAn1ig8.jpg"
                    alt="Gravata Roxa Paisley"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-gold/30 rounded-lg -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border border-gold/20 rounded-lg -z-10" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-gold/50 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-gold rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
