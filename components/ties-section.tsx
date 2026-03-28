"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Check } from "lucide-react"
import { products, type Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"

type Category = "all" | "gravata-lisa" | "gravata-desenhada"

const ties = products.filter(p => p.category.startsWith("gravata"))

export function TiesSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("all")
  const [addedId, setAddedId] = useState<string | null>(null)
  const { addItem } = useCart()

  const filteredTies = activeCategory === "all" 
    ? ties 
    : ties.filter(tie => tie.category === activeCategory)

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, 1)
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  return (
    <section id="gravatas" className="py-20 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">
            Colecao
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mt-4 mb-6">
            Nossas Gravatas
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Gravatas lisas e desenhadas de alta qualidade, perfeitas para expressar elegancia e bom gosto em qualquer ocasiao.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-primary text-gold"
                : "border border-primary/20 text-primary hover:bg-primary/5"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveCategory("gravata-lisa")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "gravata-lisa"
                ? "bg-primary text-gold"
                : "border border-primary/20 text-primary hover:bg-primary/5"
            }`}
          >
            Lisas
          </button>
          <button
            onClick={() => setActiveCategory("gravata-desenhada")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
              activeCategory === "gravata-desenhada"
                ? "bg-primary text-gold"
                : "border border-primary/20 text-primary hover:bg-primary/5"
            }`}
          >
            Desenhadas
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTies.map((tie) => (
            <Link
              key={tie.id}
              href={`/produto/${tie.id}`}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-300 hover:shadow-lg block"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-muted">
                <img 
                  src={tie.image}
                  alt={tie.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/90 text-gold text-xs font-medium rounded-full">
                    {tie.categoryLabel}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-serif text-xl text-primary mb-2 group-hover:text-primary/80 transition-colors">
                  {tie.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {tie.description}
                </p>
                <Button 
                  onClick={(e) => handleQuickAdd(e, tie)}
                  className={`w-full ${
                    addedId === tie.id
                      ? "bg-green-600 hover:bg-green-600 text-white"
                      : "bg-primary text-gold hover:bg-primary/90"
                  }`}
                >
                  {addedId === tie.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Adicionado
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Adicionar ao Carrinho
                    </>
                  )}
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
