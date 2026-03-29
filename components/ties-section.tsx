import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

// Imagens estáticas para apresentação na home - apenas showcase, sem ação de compra
const tieCategories = [
  {
    category: "Gravatas Lisas",
    description: "Elegância clássica em cores sólidas. Perfeitas para o dia a dia nas congregações e eventos formais.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2343-UPsWvsTbwwihs8FpErODzGIh9wm0RB.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2347-KOXC1T0fEEvThkZlHKhckMrnGIYA7F.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2346-tbXE1oPPwWAafnP5ZtsrEWE3Q5lKPm.jpg",
    ],
    colors: ["Azul Royal", "Bordô", "Vermelho", "Preto", "Cinza", "Verde", "Amarelo"]
  },
  {
    category: "Gravatas Desenhadas",
    description: "Padrões paisley e texturas sofisticadas. Ideais para casamentos, padrinhos e ocasiões especiais.",
    images: [
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2007%20%281%29-9VlnXvNYsGnaK8hAhHXRVmhPAn1ig8.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2332-pS44O1CDSmaKPOVyfEWyfor1Nee3ax.jpg",
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2333-vpZhPNtLRRAKzKS00iNIxOXX6f2n4r.jpg",
    ],
    colors: ["Roxa Paisley", "Verde Paisley", "Azul Paisley", "Bordô Paisley"]
  }
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
            Elegância e sofisticação em cada detalhe. Gravatas de alta qualidade 
            para homens que valorizam a apresentação impecável.
          </p>
        </div>

        {/* Categories Showcase */}
        <div className="space-y-20">
          {tieCategories.map((cat, idx) => (
            <div 
              key={cat.category}
              className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}
            >
              {/* Images Grid */}
              <div className="flex-1 w-full">
                <div className="grid grid-cols-3 gap-3">
                  {cat.images.map((img, i) => (
                    <div 
                      key={i}
                      className="aspect-[3/4] relative rounded-lg overflow-hidden bg-muted"
                    >
                      <Image
                        src={img}
                        alt={`${cat.category} ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 w-full lg:max-w-md">
                <h3 className="font-serif text-3xl text-primary mb-4">
                  {cat.category}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {cat.description}
                </p>
                
                {/* Colors */}
                <div className="mb-8">
                  <span className="text-sm font-medium text-foreground block mb-3">
                    Cores disponíveis:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {cat.colors.map((color) => (
                      <span 
                        key={color}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>

                <Link href="/gravatas">
                  <Button className="bg-primary text-gold hover:bg-primary/90">
                    Ver Coleção Completa
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TiesSection
