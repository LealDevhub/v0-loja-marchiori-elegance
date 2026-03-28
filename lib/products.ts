// Tipos de produtos do banco de dados
export interface Tie {
  id: string
  title: string
  description: string | null
  image_url: string | null
  price: number
  stock: number
  category: 'lisa' | 'desenhada'
  color: string | null
  active: boolean
  created_at: string
  updated_at: string
}

export interface Shirt {
  id: string
  title: string
  description: string | null
  image_url: string | null
  collar_type: 'italiano' | 'frances'
  color: 'branca' | 'preta'
  simple_cuff_price: number
  simple_cuff_stock: number
  double_cuff_price: number
  double_cuff_stock: number
  active: boolean
  created_at: string
  updated_at: string
}

// Tipo para itens do carrinho
export type CartItem = 
  | { type: 'tie'; product: Tie; quantity: number }
  | { type: 'shirt'; product: Shirt; cuffType: 'simples' | 'duplo'; quantity: number }

// Funções auxiliares para formatação
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(price)
}

export function getCollarTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'italiano': 'Colarinho Italiano',
    'frances': 'Colarinho Francês'
  }
  return labels[type] || type
}

export function getCuffTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'simples': 'Punho Simples',
    'duplo': 'Punho Duplo'
  }
  return labels[type] || type
}

export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    'lisa': 'Gravata Lisa',
    'desenhada': 'Gravata Desenhada'
  }
  return labels[category] || category
}

export function getColorLabel(color: string): string {
  const labels: Record<string, string> = {
    'branca': 'Branca',
    'preta': 'Preta'
  }
  return labels[color] || color
}
