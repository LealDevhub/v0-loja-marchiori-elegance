"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

const WHATSAPP_NUMBER = "5511972547572"

const ties = [
  {
    id: 1,
    name: "Azul Royal Lisa",
    category: "Lisa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2343-UPsWvsTbwwihs8FpErODzGIh9wm0RB.jpg",
    description: "Elegância clássica em azul royal com textura refinada"
  },
  {
    id: 2,
    name: "Bordô Lisa",
    category: "Lisa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2347-KOXC1T0fEEvThkZlHKhckMrnGIYA7F.jpg",
    description: "Tom sofisticado de bordô para ocasiões especiais"
  },
  {
    id: 3,
    name: "Vermelha Lisa",
    category: "Lisa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2346-tbXE1oPPwWAafnP5ZtsrEWE3Q5lKPm.jpg",
    description: "Vermelho vibrante com acabamento premium"
  },
  {
    id: 4,
    name: "Roxa Paisley",
    category: "Desenhada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2007%20%281%29-9VlnXvNYsGnaK8hAhHXRVmhPAn1ig8.jpg",
    description: "Padrão paisley elegante em tons de roxo"
  },
  {
    id: 5,
    name: "Verde Paisley",
    category: "Desenhada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2332-pS44O1CDSmaKPOVyfEWyfor1Nee3ax.jpg",
    description: "Verde escuro com desenho paisley sofisticado"
  },
  {
    id: 6,
    name: "Azul Paisley",
    category: "Desenhada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2333-vpZhPNtLRRAKzKS00iNIxOXX6f2n4r.jpg",
    description: "Azul marinho com padrão paisley clássico"
  },
]

export function TiesSection() {
  return (
    <section id="gravatas" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Coleção
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mt-4 mb-6">
            Nossas Gravatas
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gravatas lisas e desenhadas de alta qualidade, perfeitas para expressar elegância e bom gosto em qualquer ocasião.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <span className="px-6 py-2 bg-primary text-gold rounded-full text-sm font-medium">
            Todas
          </span>
          <span className="px-6 py-2 border border-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/5 cursor-pointer transition-colors">
            Lisas
          </span>
          <span className="px-6 py-2 border border-primary/20 text-primary rounded-full text-sm font-medium hover:bg-primary/5 cursor-pointer transition-colors">
            Desenhadas
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ties.map((tie) => {
            const whatsappMessage = `Olá! Tenho interesse na gravata ${tie.name} da Marchiori Elegance.`
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
            
            return (
              <div 
                key={tie.id}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                  <img 
                    src={tie.image}
                    alt={tie.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/90 text-gold text-xs font-medium rounded-full">
                      {tie.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-primary mb-2">{tie.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{tie.description}</p>
                  <Button 
                    asChild
                    className="w-full bg-primary text-gold hover:bg-primary/90"
                  >
                    <Link href={whatsappLink} target="_blank">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comprar via WhatsApp
                    </Link>
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
