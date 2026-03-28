"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Tie, formatPrice, getCategoryLabel } from '@/lib/products'
import { useCart } from '@/lib/cart-context'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppFloat from '@/components/whatsapp-float'
import { Button } from '@/components/ui/button'

export default function TieProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [tie, setTie] = useState<Tie | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    async function fetchTie() {
      const supabase = createClient()
      const { data } = await supabase
        .from('ties')
        .select('*')
        .eq('id', params.id)
        .single()
      
      setTie(data)
      setLoading(false)
    }
    fetchTie()
  }, [params.id])

  const handleAddToCart = () => {
    if (!tie || tie.stock <= 0) return
    
    addItem({
      type: 'tie',
      product: tie,
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

  if (!tie) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-serif text-3xl text-primary mb-4">Produto não encontrado</h1>
            <p className="text-muted-foreground mb-8">A gravata que você procura não está disponível.</p>
            <Link href="/gravatas">
              <Button>Ver todas as gravatas</Button>
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
            <Link href="/gravatas" className="hover:text-accent transition-colors">Gravatas</Link>
            <span>/</span>
            <span className="text-foreground">{tie.title}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Imagem */}
            <div className="aspect-square relative rounded-lg overflow-hidden bg-muted">
              {tie.image_url ? (
                <Image
                  src={tie.image_url}
                  alt={tie.title}
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
                {getCategoryLabel(tie.category)}
              </span>
              
              <h1 className="font-serif text-3xl md:text-4xl text-primary mt-2 mb-4">
                {tie.title}
              </h1>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {tie.description || 'Gravata de alta qualidade com acabamento premium. Perfeita para congregações, casamentos e eventos sociais.'}
              </p>

              {tie.color && (
                <div className="mb-4">
                  <span className="text-sm text-muted-foreground">Cor: </span>
                  <span className="text-sm font-medium text-foreground">{tie.color}</span>
                </div>
              )}

              <div className="text-3xl font-serif text-primary mb-6">
                {formatPrice(tie.price)}
              </div>

              <div className="mb-6">
                <span className="text-sm text-muted-foreground">
                  {tie.stock > 0 ? `${tie.stock} unidades em estoque` : 'Produto indisponível'}
                </span>
              </div>

              {/* Quantidade */}
              {tie.stock > 0 && (
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
                      onClick={() => setQuantity(Math.min(tie.stock, quantity + 1))}
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
                  disabled={tie.stock <= 0 || added}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                >
                  {added ? (
                    <>
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Adicionado!
                    </>
                  ) : tie.stock <= 0 ? (
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
