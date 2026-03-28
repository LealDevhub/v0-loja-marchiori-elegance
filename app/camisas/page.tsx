import { createClient } from '@/lib/supabase/server'
import { Shirt, formatPrice, getCollarTypeLabel } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import Footer from '@/components/footer'
import WhatsAppFloat from '@/components/whatsapp-float'

export const metadata = {
  title: 'Camisas Sociais | Marchiori Elegance',
  description: 'Camisas sociais com colarinho italiano e francês, punho simples ou duplo.'
}

export default async function CamisasPage() {
  const supabase = await createClient()
  
  const { data: shirts } = await supabase
    .from('shirts')
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
              Camisas Sociais
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Camisas de alta qualidade com tecido misto, disponíveis com colarinho italiano 
              ou francês e opções de punho simples ou duplo.
            </p>
          </div>

          {/* Informações */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-card p-4 rounded-lg border border-border text-center">
              <span className="text-accent font-medium">Colarinhos</span>
              <p className="text-sm text-muted-foreground mt-1">Italiano e Francês</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border text-center">
              <span className="text-accent font-medium">Punhos</span>
              <p className="text-sm text-muted-foreground mt-1">Simples ou Duplo</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border text-center">
              <span className="text-accent font-medium">Cores</span>
              <p className="text-sm text-muted-foreground mt-1">Branca e Preta</p>
            </div>
            <div className="bg-card p-4 rounded-lg border border-border text-center">
              <span className="text-accent font-medium">Tamanhos</span>
              <p className="text-sm text-muted-foreground mt-1">0 ao 6</p>
            </div>
          </div>

          {/* Grid de produtos */}
          {shirts && shirts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {shirts.map((shirt: Shirt) => (
                <Link
                  key={shirt.id}
                  href={`/produto/camisa/${shirt.id}`}
                  className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border"
                >
                  <div className="aspect-square relative overflow-hidden bg-muted">
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
                    {(shirt.simple_cuff_stock <= 0 && shirt.double_cuff_stock <= 0) && (
                      <div className="absolute inset-0 bg-primary/80 flex items-center justify-center">
                        <span className="text-primary-foreground font-medium">Esgotado</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-accent font-medium uppercase tracking-wider">
                      {getCollarTypeLabel(shirt.collar_type)}
                    </span>
                    <h3 className="font-serif text-lg text-card-foreground mt-1 group-hover:text-accent transition-colors">
                      {shirt.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Cor: {shirt.color === 'branca' ? 'Branca' : 'Preta'}
                    </p>
                    <div className="flex flex-col gap-1 mt-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Punho Simples:</span>
                        <span className="font-semibold text-primary">{formatPrice(shirt.simple_cuff_price)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Punho Duplo:</span>
                        <span className="font-semibold text-primary">{formatPrice(shirt.double_cuff_price)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhuma camisa disponível no momento.
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
