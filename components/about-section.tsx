"use client"

import { Award, Truck, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Tecidos selecionados e acabamento impecável em cada peça."
  },
  {
    icon: Truck,
    title: "Entrega para Todo Brasil",
    description: "Enviamos para todas as regiões com segurança e rastreamento."
  },
  {
    icon: Shield,
    title: "Satisfação Garantida",
    description: "Compromisso com a sua satisfação em cada compra."
  },
  {
    icon: Clock,
    title: "Atendimento Ágil",
    description: "Resposta rápida pelo WhatsApp para tirar suas dúvidas."
  },
]

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 lg:py-32 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
              Nossa Missão
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mt-4 mb-6">
              Sobre a Marchiori Elegance
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              A Marchiori Elegance nasceu com o propósito de oferecer peças de vestuário 
              masculino de alta qualidade, especialmente pensadas para quem busca elegância 
              e sofisticação em momentos especiais.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Atendemos congregações cristãs em todo o Brasil, casamentos, formaturas e 
              eventos sociais. Nossa missão é fazer você se sentir confiante e bem vestido 
              em cada ocasião importante.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="font-serif text-3xl text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Clientes Satisfeitos</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Cores Disponíveis</div>
              </div>
              <div className="text-center">
                <div className="font-serif text-3xl text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Dedicação</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div 
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-primary mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
