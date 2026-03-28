"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Shirt, formatPrice, getCollarTypeLabel, getCuffTypeLabel, getColorLabel } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppFloat from '@/components/whatsapp-float'
import { Button } from '@/components/ui/button'

export default function ShirtProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [shirt, setShirt] = useState<Shirt | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [cuffType, setCuffType] = useState<'simples' | 'duplo'>('simples')
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchShirt() {
      const supabase = createClient()
      const { data } = await supabase
        .from('shirts')
        .select('*')
        .eq('id', params.id)
        .single()
      
      setShirt(data)
      setLoading(false)
    }
    fetchShirt()
  }, [params.id])

  const currentPrice = shirt 
    ? (cuffType === 'simples' ? shirt.simple_cuff_price : shirt.double_cuff_price)
    : 0
  
  const currentStock = shirt
    ? (cuffType === 'simples' ? shirt.simple_cuff_stock : shirt.double_cuff_stock)
    : 0

  const handleAddToCart = () => {
    if (!shirt || currentStock <= 0) return
    
    addItem({
      type: 'shirt',
      product: shirt,
      cuffType,
      quantity
    })
    
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-32 mb-8"></div>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-24"></div>
                  <div className="h-10 bg-muted rounded w-3/4"></div>
                  <div className="h-24 bg-muted rounded"></div>
                  <div className="h-8 bg-muted rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!shirt) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl text-primary mb-4">Produto não encontrado</h1>
            <p className="text-muted-foreground mb-8">A camisa que você procura não está disponível.</p>
            <Link href="/camisas">
              <Button>Ver todas as camisas</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-accent transition-colors">Início</Link>
            <span>/</span>
            <Link href="/camisas" className="hover:text-accent transition-colors">Camisas</Link>
            <span>/</span>
            <span className="text-foreground">{shirt.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Imagem */}
            <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
              {shirt.image_url ? (
                <Image
                  src={shirt.image_url}
                  alt={shirt.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Detalhes */}
            <div className="flex flex-col">
              <span className="text-accent font-medium uppercase tracking-wider text-sm">
                {getCollarTypeLabel(shirt.collar_type)}
              </span>
              
              <h1 className="font-serif text-3xl md:text-4xl text-primary mt-2 mb-4">
                {shirt.title}
              </h1>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {shirt.description || 'Camisa social de alta qualidade com tecido misto. Perfeita para congregações, casamentos e eventos formais.'}
              </p>

              {/* Informações */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/50 p-3 rounded-lg">
                  <span className="text-xs text-muted-foreground">Colarinho</span>
                  <p className="font-medium text-foreground">{getCollarTypeLabel(shirt.collar_type)}</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg">
                  <span className="text-xs text-muted-foreground">Cor</span>
                  <p className="font-medium text-foreground">{getColorLabel(shirt.color)}</p>
                </div>
              </div>

              {/* Seleção de Punho */}
              <div className="mb-6">
                <span className="text-sm font-medium mb-3 block">Tipo de Punho:</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setCuffType('simples')
                      setQuantity(1)
                    }}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      cuffType === 'simples'
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <span className="block font-medium text-foreground">Punho Simples</span>
                    <span className="block text-lg font-serif text-primary mt-1">
                      {formatPrice(shirt.simple_cuff_price)}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      {shirt.simple_cuff_stock > 0 ? `${shirt.simple_cuff_stock} em estoque` : 'Indisponível'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setCuffType('duplo')
                      setQuantity(1)
                    }}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      cuffType === 'duplo'
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <span className="block font-medium text-foreground">Punho Duplo</span>
                    <span className="block text-lg font-serif text-primary mt-1">
                      {formatPrice(shirt.double_cuff_price)}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      {shirt.double_cuff_stock > 0 ? `${shirt.double_cuff_stock} em estoque` : 'Indisponível'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Quantidade */}
              {currentStock > 0 && (
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm font-medium">Quantidade:</span>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button
                  onClick={handleAddToCart}
                  disabled={currentStock <= 0 || added}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {added ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Adicionado!
                    </>
                  ) : currentStock <= 0 ? (
                    'Produto Indisponível'
                  ) : (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
                
                <Button
                  onClick={() => router.push('/carrinho')}
                  variant="outline"
                  className="flex-1 h-12 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  Ver Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
