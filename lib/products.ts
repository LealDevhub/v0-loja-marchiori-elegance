export type Product = {
  id: string
  name: string
  category: "gravata-lisa" | "gravata-desenhada" | "camisa"
  categoryLabel: string
  image: string
  description: string
  details?: string[]
  price?: number
}

export const products: Product[] = [
  {
    id: "azul-royal-lisa",
    name: "Gravata Azul Royal Lisa",
    category: "gravata-lisa",
    categoryLabel: "Gravata Lisa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2343-UPsWvsTbwwihs8FpErODzGIh9wm0RB.jpg",
    description: "Elegância clássica em azul royal com textura refinada. Perfeita para ocasiões formais, reuniões e celebrações na congregação.",
    details: [
      "Cor: Azul Royal",
      "Textura: Microfibra com padrão quadriculado",
      "Acabamento: Premium",
      "Largura: Tradicional",
      "Ideal para: Congregações, eventos formais, casamentos"
    ]
  },
  {
    id: "bordo-lisa",
    name: "Gravata Bordô Lisa",
    category: "gravata-lisa",
    categoryLabel: "Gravata Lisa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2347-KOXC1T0fEEvThkZlHKhckMrnGIYA7F.jpg",
    description: "Tom sofisticado de bordô para ocasiões especiais. Uma escolha elegante que transmite confiança e distinção.",
    details: [
      "Cor: Bordô/Vinho",
      "Textura: Microfibra com padrão quadriculado",
      "Acabamento: Premium",
      "Largura: Tradicional",
      "Ideal para: Eventos noturnos, casamentos, celebrações"
    ]
  },
  {
    id: "vermelha-lisa",
    name: "Gravata Vermelha Lisa",
    category: "gravata-lisa",
    categoryLabel: "Gravata Lisa",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2346-tbXE1oPPwWAafnP5ZtsrEWE3Q5lKPm.jpg",
    description: "Vermelho vibrante com acabamento premium. Uma peça marcante que adiciona energia e presença ao visual.",
    details: [
      "Cor: Vermelho Clássico",
      "Textura: Microfibra diagonal",
      "Acabamento: Premium",
      "Largura: Tradicional",
      "Ideal para: Apresentações, eventos especiais, destaque"
    ]
  },
  {
    id: "roxa-paisley",
    name: "Gravata Roxa Paisley",
    category: "gravata-desenhada",
    categoryLabel: "Gravata Desenhada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2007%20%281%29-9VlnXvNYsGnaK8hAhHXRVmhPAn1ig8.jpg",
    description: "Padrão paisley elegante em tons de roxo e rosa. Uma escolha sofisticada para quem aprecia detalhes refinados.",
    details: [
      "Cor: Roxo com detalhes rosa",
      "Padrão: Paisley tradicional",
      "Acabamento: Premium com brilho acetinado",
      "Largura: Tradicional",
      "Ideal para: Casamentos, eventos sofisticados, padrinhos"
    ]
  },
  {
    id: "verde-paisley",
    name: "Gravata Verde Paisley",
    category: "gravata-desenhada",
    categoryLabel: "Gravata Desenhada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2332-pS44O1CDSmaKPOVyfEWyfor1Nee3ax.jpg",
    description: "Verde escuro com desenho paisley sofisticado. Um toque de distinção e elegância para ocasiões especiais.",
    details: [
      "Cor: Verde Escuro/Esmeralda",
      "Padrão: Paisley clássico",
      "Acabamento: Premium com brilho acetinado",
      "Largura: Tradicional",
      "Ideal para: Eventos formais, casamentos, celebrações"
    ]
  },
  {
    id: "azul-paisley",
    name: "Gravata Azul Paisley",
    category: "gravata-desenhada",
    categoryLabel: "Gravata Desenhada",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2333-vpZhPNtLRRAKzKS00iNIxOXX6f2n4r.jpg",
    description: "Azul marinho com padrão paisley clássico. Combina tradição e elegância em uma peça atemporal.",
    details: [
      "Cor: Azul Marinho",
      "Padrão: Paisley tradicional",
      "Acabamento: Premium com brilho acetinado",
      "Largura: Tradicional",
      "Ideal para: Todas as ocasiões formais, congregações, casamentos"
    ]
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter(p => p.category === category)
}
