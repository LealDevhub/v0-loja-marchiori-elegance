"use client"

import { use, useState } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Minus, Plus, ShoppingBag, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { getProductById } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  if (!product) {
    notFound()
  }

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(q => q - 1)
  }

  const increaseQuantity = () => {
    setQuantity(q => q + 1)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/#gravatas" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para produtos
          </Link>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-primary/90 text-gold text-sm font-medium rounded-full">
                  {product.categoryLabel}
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <span className="text-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">
                {product.categoryLabel}
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mb-6">
                {product.name}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Details */}
              {product.details && (
                <div className="mb-8">
                  <h3 className="text-primary font-medium mb-4">Detalhes do Produto</h3>
                  <ul className="space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-8">
                <label className="text-primary font-medium block mb-3">Quantidade</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      className="p-3 text-muted-foreground hover:text-primary transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="px-6 py-3 text-primary font-medium min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="p-3 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                size="lg"
                onClick={handleAddToCart}
                className={`w-full sm:w-auto font-medium text-base py-6 ${
                  added 
                    ? "bg-green-600 hover:bg-green-600 text-white" 
                    : "bg-primary text-gold hover:bg-primary/90"
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Adicionado ao Carrinho
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Adicionar ao Carrinho
                  </>
                )}
              </Button>

              {/* Cart Link */}
              <Link 
                href="/carrinho"
                className="mt-4 text-center sm:text-left text-muted-foreground hover:text-primary transition-colors text-sm underline underline-offset-4"
              >
                Ver meu carrinho
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
