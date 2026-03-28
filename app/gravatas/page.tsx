import { createClient } from '@/lib/supabase/server'
import { Tie, formatPrice, getCategoryLabel } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppFloat from '@/components/whatsapp-float'

export const metadata = {
  title: 'Gravatas | Marchiori Elegance',
  description: 'Confira nossa coleção de gravatas lisas e desenhadas com acabamento premium.'
}

export default async function GravatasPage() {
  const supabase = await createClient()
  
  const { data: ties } = await supabase
    .from('ties')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header da página */}
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl text-primary mb-4">
              Nossas Gravatas
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Elegância e sofisticação para todas as ocasiões. Gravatas lisas e desenhadas 
              com acabamento premium para congregações, casamentos e eventos sociais.
            </p>
          </div>

          {/* Filtros */}
          <div className="flex justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium">
              Todas
            </span>
            <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium cursor-pointer hover:bg-accent transition-colors">
              Lisas
            </span>
            <span className="px-4 py-2 bg-muted text-muted-foreground rounded-full text-sm font-medium cursor-pointer hover:bg-accent transition-colors">
              Desenhadas
            </span>
          </div>

          {/* Grid de produtos */}
          {ties && ties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ties.map((tie: Tie) => (
                <Link
                  key={tie.id}
                  href={`/produto/gravata/${tie.id}`}
                  className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
                >
                  <div className="aspect-square relative overflow-hidden bg-muted">
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
                        <span className="text-primary-foreground font-medium">Esgotado</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent font-medium uppercase tracking-wider">
                      {getCategoryLabel(tie.category)}
                    </span>
                    <h3 className="font-serif text-lg text-card-foreground mt-1 group-hover:text-accent transition-colors">
                      {tie.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {tie.description}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-lg font-semibold text-primary">
                        {formatPrice(tie.price)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {tie.stock > 0 ? `${tie.stock} em estoque` : 'Indisponível'}
                      </span>
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
                Em breve teremos novidades!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
      <WhatsAppFloat />
    </div>
  )
}
