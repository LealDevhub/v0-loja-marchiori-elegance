"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useCart } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsappFloat } from "@/components/whatsapp-float"
import { Button } from "@/components/ui/button"
import type { Shirt } from "@/lib/types"

export default function ShirtProductPage() {
  const params = useParams()
  const router = useRouter()
  const { addItem } = useCart()
  const [shirt, setShirt] = useState<Shirt | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [cuffType, setCuffType] = useState<'simple' | 'double'>('simple')
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const currentPrice = shirt ? (cuffType === 'simple' ? shirt.simple_cuff_price : shirt.double_cuff_price) : 0
  const currentStock = shirt ? (cuffType === 'simple' ? shirt.simple_cuff_stock : shirt.double_cuff_stock) : 0

  const handleAddToCart = () => {
    if (!shirt) return
    
    addItem({
      id: shirt.id,
      type: 'shirt',
      title: shirt.title,
      image_url: shirt.image_url,
      price: currentPrice,
      quantity: quantity,
      cuff_type: cuffType,
      collar_type: shirt.collar_type,
      color: shirt.color
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
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
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
            <h1 className="text-2xl font-serif text-primary mb-4">Produto não encontrado</h1>
            <Button onClick={() => router.push('/camisas')}>
              Voltar para Camisas
            </Button>
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
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-accent">Início</Link></li>
              <li>/</li>
              <li><Link href="/camisas" className="hover:text-accent">Camisas</Link></li>
              <li>/</li>
              <li className="text-foreground">{shirt.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-square relative bg-card rounded-lg overflow-hidden border border-border">
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

            {/* Details */}
            <div>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                  Colarinho {shirt.collar_type === 'italiano' ? 'Italiano' : 'Francês'}
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {shirt.color === 'branca' ? 'Branca' : 'Preta'}
                </span>
              </div>
              
              <h1 className="font-serif text-3xl md:text-4xl text-primary mb-4">
                {shirt.title}
              </h1>
              
              <p className="text-3xl font-semibold text-accent mb-6">
                {formatPrice(currentPrice)}
              </p>

              {shirt.description && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-2">Descrição</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {shirt.description}
                  </p>
                </div>
              )}

              {/* Cuff Type Selector */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Tipo de Punho</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setCuffType('simple')
                      setQuantity(1)
                    }}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      cuffType === 'simple' 
                        ? 'border-accent bg-accent/5' 
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="font-medium">Punho Simples</div>
                    <div className="text-lg font-semibold text-accent mt-1">
                      {formatPrice(shirt.simple_cuff_price)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {shirt.simple_cuff_stock > 0 
                        ? `${shirt.simple_cuff_stock} disponíveis` 
                        : 'Esgotado'}
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setCuffType('double')
                      setQuantity(1)
                    }}
                    className={`flex-1 p-4 rounded-lg border-2 transition-all ${
                      cuffType === 'double' 
                        ? 'border-accent bg-accent/5' 
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="font-medium">Punho Duplo</div>
                    <div className="text-lg font-semibold text-accent mt-1">
                      {formatPrice(shirt.double_cuff_price)}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {shirt.double_cuff_stock > 0 
                        ? `${shirt.double_cuff_stock} disponíveis` 
                        : 'Esgotado'}
                    </div>
                  </button>
                </div>
              </div>

              {currentStock > 0 && (
                <>
                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-foreground mb-2">Quantidade</h3>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xl font-medium w-12 text-center">{quantity}</span>
                      <button
                        onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                        className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <Button
                    onClick={handleAddToCart}
                    className="w-full py-6 text-lg bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={added}
                  >
                    {added ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Adicionado ao Carrinho!
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Adicionar ao Carrinho
                      </span>
                    )}
                  </Button>
                </>
              )}

              {currentStock <= 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 font-medium">
                    Este tipo de punho está esgotado. Selecione outra opção ou entre em contato.
                  </p>
                </div>
              )}

              {/* WhatsApp */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">
                  Dúvidas sobre este produto? Fale conosco!
                </p>
                <a
                  href={`https://wa.me/5511972547572?text=Olá! Tenho interesse na camisa: ${shirt.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsappFloat />
    </div>
  )
}
