import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const shirtFeatures = [
  { label: "Colarinho", options: ["Italiano", "Francês"] },
  { label: "Punho", options: ["Simples", "Duplo"] },
  { label: "Tecido", options: ["Misto"] },
  { label: "Cores", options: ["Branca", "Preta"] },
  { label: "Tamanhos", options: ["0 ao 6"] },
]

export function ShirtsSection() {
  return (
    <section id="camisas" className="py-20 lg:py-32 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
              Sob Medida
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gold mt-4 mb-6">
              Camisas Sociais
            </h2>
            <p className="text-gold/70 text-lg mb-8 leading-relaxed">
              Camisas de alta qualidade com acabamento impecável. Escolha entre diferentes 
              tipos de colarinho, punho e tamanhos para encontrar o ajuste perfeito.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              {shirtFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <span className="text-gold font-medium">{feature.label}:</span>
                    <span className="text-gold/70 ml-2">
                      {feature.options.join(" ou ")}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/camisas">
              <Button 
                size="lg"
                className="bg-gold text-primary hover:bg-gold-light font-medium"
              >
                Ver Camisas Disponíveis
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-serif text-2xl text-gold mb-3">Múltiplas Opções</h3>
                <p className="text-gold/60 text-sm">
                  Escolha o tipo de colarinho e punho ideal para sua necessidade
                </p>
              </div>
            </div>
            
            {/* Size Chart */}
            <div className="absolute -bottom-6 -right-6 bg-card rounded-xl p-4 shadow-lg border border-border">
              <p className="text-xs text-muted-foreground mb-2">Tamanhos disponíveis</p>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5, 6].map((size) => (
                  <span 
                    key={size}
                    className="w-8 h-8 rounded bg-primary text-gold text-sm flex items-center justify-center font-medium"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShirtsSection
