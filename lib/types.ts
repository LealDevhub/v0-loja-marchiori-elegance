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

export interface CartItem {
  id: string
  type: 'tie' | 'shirt'
  title: string
  image_url: string | null
  price: number
  quantity: number
  // For shirts
  cuff_type?: 'simple' | 'double'
  collar_type?: string
  color?: string
}
