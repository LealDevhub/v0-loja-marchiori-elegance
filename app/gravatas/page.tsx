import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { WhatsappFloat } from "@/components/whatsapp-float"
import type { Tie } from "@/lib/types"

export const revalidate = 60

export default async function GravatasPage() {
  const supabase = await createClient()
  
  const { data: ties } = await supabase
    .from('ties')
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
              Nossas Gravatas
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Gravatas de alta qualidade para todas as ocasiões. Elegância e sofisticação para congregações, casamentos e eventos sociais.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center mb-10">
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              Todas
            </span>
            <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
              Lisas
            </span>
            <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
              Desenhadas
            </span>
          </div>

          {/* Products Grid */}
          {ties && ties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(ties as Tie[]).map((tie) => (
                <Link
                  key={tie.id}
                  href={`/gravatas/${tie.id}`}
                  className="group bg-card rounded-lg overflow-hidden border border-border hover:border-accent transition-all duration-300 hover:shadow-lg"
                >
                  <div className="aspect-square relative bg-muted overflow-hidden">
                    {tie.image_url ? (
                      <Image
                        src={tie.image_url}
                        alt={tie.title}
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
                    {tie.stock <= 0 && (
                      <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                        <span className="text-primary-foreground font-semibold">Esgotado</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-xs rounded">
                        {tie.category === 'lisa' ? 'Lisa' : 'Desenhada'}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2">
                      {tie.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-semibold text-accent">
                        {formatPrice(tie.price)}
                      </span>
                      {tie.stock > 0 && tie.stock <= 5 && (
                        <span className="text-xs text-orange-600">
                          Restam {tie.stock}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhuma gravata disponível no momento.
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
