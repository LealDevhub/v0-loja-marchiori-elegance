"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Tie, Shirt, formatPrice, getCategoryLabel, getCollarTypeLabel } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

type Tab = 'gravatas' | 'camisas'

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('gravatas')
  const [ties, setTies] = useState<Tie[]>([])
  const [shirts, setShirts] = useState<Shirt[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    setLoading(true)
    const supabase = createClient()
    
    const [tiesRes, shirtsRes] = await Promise.all([
      supabase.from('ties').select('*').order('created_at', { ascending: false }),
      supabase.from('shirts').select('*').order('created_at', { ascending: false })
    ])
    
    setTies(tiesRes.data || [])
    setShirts(shirtsRes.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleDeleteTie = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta gravata?')) return
    
    const supabase = createClient()
    await supabase.from('ties').delete().eq('id', id)
    fetchProducts()
  }

  const handleDeleteShirt = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta camisa?')) return
    
    const supabase = createClient()
    await supabase.from('shirts').delete().eq('id', id)
    fetchProducts()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Admin */}
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-serif text-xl">
              Marchiori Elegance
            </Link>
            <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded">
              Admin
            </span>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Voltar ao Site
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl text-primary mb-8">Gerenciar Produtos</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setTab('gravatas')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              tab === 'gravatas'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent/20'
            }`}
          >
            Gravatas ({ties.length})
          </button>
          <button
            onClick={() => setTab('camisas')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              tab === 'camisas'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-accent/20'
            }`}
          >
            Camisas ({shirts.length})
          </button>
        </div>

        {/* Ações */}
        <div className="flex gap-4 mb-8">
          {tab === 'gravatas' ? (
            <Link href="/admin/gravata/nova">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nova Gravata
              </Button>
            </Link>
          ) : (
            <Link href="/admin/camisa/nova">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nova Camisa
              </Button>
            </Link>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto"></div>
            <p className="text-muted-foreground mt-4">Carregando produtos...</p>
          </div>
        )}

        {/* Lista de Gravatas */}
        {!loading && tab === 'gravatas' && (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {ties.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma gravata cadastrada.</p>
                <Link href="/admin/gravata/nova">
                  <Button className="mt-4">Cadastrar primeira gravata</Button>
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Produto</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Categoria</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Preço</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Estoque</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ties.map((tie) => (
                    <tr key={tie.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                            {tie.image_url ? (
                              <Image
                                src={tie.image_url}
                                alt={tie.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-card-foreground">{tie.title}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{getCategoryLabel(tie.category)}</td>
                      <td className="p-4 font-medium text-primary">{formatPrice(tie.price)}</td>
                      <td className="p-4 text-muted-foreground">{tie.stock}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          tie.active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {tie.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/gravata/${tie.id}`}>
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteTie(tie.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Lista de Camisas */}
        {!loading && tab === 'camisas' && (
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {shirts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhuma camisa cadastrada.</p>
                <Link href="/admin/camisa/nova">
                  <Button className="mt-4">Cadastrar primeira camisa</Button>
                </Link>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">Produto</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Colarinho</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">P. Simples</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">P. Duplo</th>
                    <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                    <th className="text-right p-4 font-medium text-muted-foreground">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {shirts.map((shirt) => (
                    <tr key={shirt.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded bg-muted overflow-hidden flex-shrink-0">
                            {shirt.image_url ? (
                              <Image
                                src={shirt.image_url}
                                alt={shirt.title}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-card-foreground block">{shirt.title}</span>
                            <span className="text-xs text-muted-foreground">Cor: {shirt.color}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{getCollarTypeLabel(shirt.collar_type)}</td>
                      <td className="p-4">
                        <div className="text-sm">
                          <span className="font-medium text-primary">{formatPrice(shirt.simple_cuff_price)}</span>
                          <span className="text-muted-foreground block text-xs">{shirt.simple_cuff_stock} un.</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm">
                          <span className="font-medium text-primary">{formatPrice(shirt.double_cuff_price)}</span>
                          <span className="text-muted-foreground block text-xs">{shirt.double_cuff_stock} un.</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          shirt.active 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {shirt.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/admin/camisa/${shirt.id}`}>
                            <Button variant="outline" size="sm">
                              Editar
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteShirt(shirt.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
