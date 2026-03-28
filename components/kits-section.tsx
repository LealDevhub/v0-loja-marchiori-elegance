"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageCircle, Gift, Users, Heart, Calendar } from "lucide-react"

const WHATSAPP_NUMBER = "5511972547572"

const kits = [
  {
    id: 1,
    title: "Kit Padrinhos",
    description: "Gravatas combinando para todos os padrinhos do casamento. Personalize as cores conforme o tema.",
    icon: Users,
    features: ["Gravatas iguais ou combinando", "Desconto especial para grupos", "Embalagem para presente"],
  },
  {
    id: 2,
    title: "Kit Dia dos Pais",
    description: "Presente especial para o pai. Gravata premium com embalagem exclusiva para presentear.",
    icon: Heart,
    features: ["Gravata premium", "Caixa de presente", "Cartão personalizado"],
  },
  {
    id: 3,
    title: "Kit Presente",
    description: "Ideal para aniversários, formaturas e ocasiões especiais. Um presente que marca.",
    icon: Gift,
    features: ["Gravata à escolha", "Embalagem especial", "Opção de camisa"],
  },
  {
    id: 4,
    title: "Kit Congregação",
    description: "Condições especiais para igrejas e congregações. Uniformização elegante.",
    icon: Calendar,
    features: ["Preços especiais para quantidade", "Cores padronizadas", "Entrega combinada"],
  },
]

export function KitsSection() {
  return (
    <section id="kits" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Especiais
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mt-4 mb-6">
            Kits para Ocasiões
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Soluções completas para casamentos, datas comemorativas e grupos. 
            Condições especiais para compras em quantidade.
          </p>
        </div>

        {/* Kits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {kits.map((kit) => {
            const whatsappMessage = `Olá! Tenho interesse no ${kit.title} da Marchiori Elegance.`
            const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`
            const Icon = kit.icon
            
            return (
              <div 
                key={kit.id}
                className="group bg-card rounded-xl p-8 border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex items-start gap-6">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Icon className="w-7 h-7 text-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl text-primary mb-2">{kit.title}</h3>
                    <p className="text-muted-foreground mb-4">{kit.description}</p>
                    <ul className="space-y-2 mb-6">
                      {kit.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      asChild
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-gold"
                    >
                      <Link href={whatsappLink} target="_blank">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Solicitar Orçamento
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
