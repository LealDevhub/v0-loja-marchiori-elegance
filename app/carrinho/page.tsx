"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"
import { useCart } from "@/lib/cart-context"
import { formatPrice, getCategoryLabel, getCollarTypeLabel, getCuffTypeLabel } from "@/lib/products"

const WHATSAPP_NUMBER = "5511972547572"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart, totalItems, getItemKey } = useCart()

  // Calcular total do carrinho
  const calculateTotal = () => {
    return items.reduce((total, item) => {
      if (item.type === 'tie') {
        return total + (item.product.price * item.quantity)
      } else {
        const price = item.cuffType === 'simples' 
          ? item.product.simple_cuff_price 
          : item.product.double_cuff_price
        return total + (price * item.quantity)
      }
    }, 0)
  }

  const generateWhatsAppMessage = () => {
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n"
    message += "═══════════════════════\n"
    message += "    RESUMO DO PEDIDO    \n"
    message += "═══════════════════════\n\n"
    
    items.forEach((item, index) => {
      if (item.type === 'tie') {
        message += `${index + 1}. GRAVATA\n`
        message += `   ${item.product.title}\n`
        message += `   Categoria: ${getCategoryLabel(item.product.category)}\n`
        message += `   Quantidade: ${item.quantity}\n`
        message += `   Valor unit.: ${formatPrice(item.product.price)}\n`
        message += `   Subtotal: ${formatPrice(item.product.price * item.quantity)}\n\n`
      } else {
        const price = item.cuffType === 'simples' 
          ? item.product.simple_cuff_price 
          : item.product.double_cuff_price
        message += `${index + 1}. CAMISA\n`
        message += `   ${item.product.title}\n`
        message += `   Colarinho: ${getCollarTypeLabel(item.product.collar_type)}\n`
        message += `   Punho: ${getCuffTypeLabel(item.cuffType)}\n`
        message += `   Cor: ${item.product.color === 'branca' ? 'Branca' : 'Preta'}\n`
        message += `   Quantidade: ${item.quantity}\n`
        message += `   Valor unit.: ${formatPrice(price)}\n`
        message += `   Subtotal: ${formatPrice(price * item.quantity)}\n\n`
      }
    })
    
    message += `═══════════════════════\n`
    message += `TOTAL: ${formatPrice(calculateTotal())}\n`
    message += `Total de itens: ${totalItems}\n`
    message += `═══════════════════════\n\n`
    message += "Por favor, me envie o link de pagamento ou chave PIX para finalizar a compra. Obrigado!"
    
    return message
  }

  const handleCheckout = () => {
    const message = generateWhatsAppMessage()
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    
    // Clear cart
    clearCart()
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, "_blank")
    
    // Redirect to thank you page
    router.push("/obrigado")
  }

  const getItemPrice = (item: typeof items[0]) => {
    if (item.type === 'tie') {
      return item.product.price
    }
    return item.cuffType === 'simples' 
      ? item.product.simple_cuff_price 
      : item.product.double_cuff_price
  }

  const getItemLink = (item: typeof items[0]) => {
    if (item.type === 'tie') {
      return `/produto/gravata/${item.product.id}`
    }
    return `/produto/camisa/${item.product.id}`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        {/* Breadcrumb */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            href="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continuar comprando
          </Link>
        </div>

        {/* Cart Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <h1 className="font-serif text-3xl sm:text-4xl text-primary mb-8">
            Meu Carrinho
          </h1>

          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h2 className="font-serif text-2xl text-primary mb-3">
                Seu carrinho está vazio
              </h2>
              <p className="text-muted-foreground mb-8">
                Adicione produtos ao seu carrinho para continuar
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button asChild className="bg-primary text-gold hover:bg-primary/90">
                  <Link href="/gravatas">
                    Ver Gravatas
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/camisas">
                    Ver Camisas
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {items.map((item) => {
                  const itemKey = getItemKey(item)
                  const price = getItemPrice(item)
                  
                  return (
                    <div 
                      key={itemKey}
                      className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-card rounded-xl border border-border"
                    >
                      {/* Product Image */}
                      <Link href={getItemLink(item)} className="flex-shrink-0">
                        <div className="w-24 h-32 sm:w-32 sm:h-40 rounded-lg overflow-hidden bg-muted">
                          {item.product.image_url ? (
                            <Image 
                              src={item.product.image_url}
                              alt={item.product.title}
                              width={128}
                              height={160}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </Link>

                      {/* Product Info */}
                      <div className="flex-1 flex flex-col">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-gold text-xs font-medium tracking-wider uppercase">
                              {item.type === 'tie' ? getCategoryLabel(item.product.category) : getCollarTypeLabel(item.product.collar_type)}
                            </span>
                            <Link href={getItemLink(item)}>
                              <h3 className="font-serif text-lg sm:text-xl text-primary mt-1 hover:text-primary/80 transition-colors">
                                {item.product.title}
                              </h3>
                            </Link>
                            {item.type === 'shirt' && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {getCuffTypeLabel(item.cuffType)} | Cor: {item.product.color === 'branca' ? 'Branca' : 'Preta'}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(itemKey)}
                            className="text-muted-foreground hover:text-destructive transition-colors p-1"
                            title="Remover item"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="mt-auto pt-4 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Qtd:</span>
                            <div className="flex items-center border border-border rounded-lg">
                              <button
                                onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 text-primary font-medium min-w-[40px] text-center text-sm">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-muted-foreground block">
                              {formatPrice(price)} cada
                            </span>
                            <span className="font-serif text-lg text-primary">
                              {formatPrice(price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Order Summary */}
              <div className="bg-primary rounded-2xl p-6 sm:p-8">
                <h2 className="font-serif text-2xl text-gold mb-6">
                  Resumo do Pedido
                </h2>
                
                <div className="space-y-3 mb-6">
                  {items.map((item) => {
                    const price = getItemPrice(item)
                    return (
                      <div key={getItemKey(item)} className="flex justify-between text-gold/80 text-sm">
                        <span className="flex-1">
                          {item.product.title}
                          {item.type === 'shirt' && ` (${getCuffTypeLabel(item.cuffType)})`}
                          {' '}x{item.quantity}
                        </span>
                        <span className="font-medium">{formatPrice(price * item.quantity)}</span>
                      </div>
                    )
                  })}
                </div>

                <div className="border-t border-gold/20 pt-4 mb-8">
                  <div className="flex justify-between text-gold font-medium text-lg">
                    <span>Total</span>
                    <span className="font-serif text-2xl">{formatPrice(calculateTotal())}</span>
                  </div>
                  <div className="flex justify-between text-gold/60 text-sm mt-1">
                    <span>Itens no carrinho</span>
                    <span>{totalItems}</span>
                  </div>
                </div>

                <p className="text-gold/60 text-sm mb-6">
                  Ao clicar em &quot;Finalizar Pedido&quot;, você será redirecionado para o WhatsApp com o resumo do seu pedido. 
                  O vendedor enviará o link de pagamento ou chave PIX.
                </p>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full bg-gold text-primary hover:bg-gold-light font-medium text-base py-6"
                >
                  Finalizar Pedido via WhatsApp
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
