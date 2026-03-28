import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsappFloat } from "@/components/whatsapp-float"
import type { Shirt } from "@/lib/types"

export const revalidate = 60

export default async function CamisasPage() {
  const supabase = await createClient()
  
  const { data: shirts } = await supabase
    .from('shirts')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              Nossas Camisas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Camisas sociais de tecido misto com acabamento impecável. Colarinho italiano ou francês, punho simples ou duplo.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Colarinho</h3>
              <p className="text-sm text-muted-foreground">Italiano ou Francês</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Cores</h3>
              <p className="text-sm text-muted-foreground">Branca ou Preta</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Tamanhos</h3>
              <p className="text-sm text-muted-foreground">Do 0 ao 6</p>
            </div>
          </div>

          {/* Products Grid */}
          {shirts && shirts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(shirts as Shirt[]).map((shirt) => {
                const minPrice = Math.min(shirt.simple_cuff_price, shirt.double_cuff_price)
                const totalStock = shirt.simple_cuff_stock + shirt.double_cuff_stock
                
                return (
                  <Link
                    key={shirt.id}
                    href={`/camisas/${shirt.id}`}
                    className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
                  >
                    <div className="aspect-square relative bg-muted overflow-hidden">
                      {shirt.image_url ? (
                        <Image
                          src={shirt.image_url}
                          alt={shirt.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                      {totalStock <= 0 && (
                        <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                          <span className="text-primary-foreground font-semibold">Esgotado</span>
                        </div>
                      )}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded">
                          {shirt.collar_type === 'italiano' ? 'Colarinho Italiano' : 'Colarinho Francês'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
                        {shirt.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {shirt.color === 'branca' ? 'Branca' : 'Preta'}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-lg font-semibold text-accent">
                          A partir de {formatPrice(minPrice)}
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhuma camisa disponível no momento.
              </p>
              <p className="text-muted-foreground mt-2">
                Entre em contato conosco pelo WhatsApp para mais informações.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsappFloat />
    </div>
  )
}
