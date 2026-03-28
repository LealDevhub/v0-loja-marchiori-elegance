"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { useCart } from "@/lib/cart-context"

const WHATSAPP_NUMBER = "5511972547572"

export default function CartPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart, totalItems } = useCart()

  const generateWhatsAppMessage = () => {
    let message = "Olá! Gostaria de fazer o seguinte pedido:\n\n"
    message += "--- RESUMO DO PEDIDO ---\n\n"
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name}\n`
      message += `   Quantidade: ${item.quantity}\n`
      message += `   Categoria: ${item.product.categoryLabel}\n\n`
    })
    
    message += `----------------------------\n`
    message += `Total de itens: ${totalItems}\n\n`
    message += "Por favor, me envie o link de pagamento ou chave PIX para finalizar a compra. Obrigado!"
    
    return message
  }

  const handleCheckout = () => {
    const message = generateWhatsAppMessage()
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
    
    // Clear cart and redirect to thank you page
    clearCart()
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, "_blank")
    
    // Redirect to thank you page
    router.push("/obrigado")
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
              <Button asChild className="bg-primary text-gold hover:bg-primary/90">
                <Link href="/#gravatas">
                  Ver Produtos
                </Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="space-y-6 mb-8">
                {items.map((item) => (
                  <div 
                    key={item.product.id}
                    className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-card rounded-xl border border-border"
                  >
                    {/* Product Image */}
                    <Link href={`/produto/${item.product.id}`} className="flex-shrink-0">
                      <div className="w-24 h-32 sm:w-32 sm:h-40 rounded-lg overflow-hidden bg-muted">
                        <img 
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <span className="text-gold text-xs font-medium tracking-wider uppercase">
                            {item.product.categoryLabel}
                          </span>
                          <Link href={`/produto/${item.product.id}`}>
                            <h3 className="font-serif text-lg sm:text-xl text-primary mt-1 hover:text-primary/80 transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1"
                          title="Remover item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="mt-auto pt-4">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">Qtd:</span>
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-primary font-medium min-w-[40px] text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-primary rounded-2xl p-6 sm:p-8">
                <h2 className="font-serif text-2xl text-gold mb-6">
                  Resumo do Pedido
                </h2>
                
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-gold/80">
                      <span>{item.product.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gold/20 pt-4 mb-8">
                  <div className="flex justify-between text-gold font-medium text-lg">
                    <span>Total de Itens</span>
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
