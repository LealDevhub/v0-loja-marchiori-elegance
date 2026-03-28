"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Tie, Shirt } from "@/lib/types"

type Tab = 'ties' | 'shirts'
type Modal = 'none' | 'create-tie' | 'edit-tie' | 'create-shirt' | 'edit-shirt'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<Tab>('ties')
  const [ties, setTies] = useState<Tie[]>([])
  const [shirts, setShirts] = useState<Shirt[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<Modal>('none')
  const [editingTie, setEditingTie] = useState<Tie | null>(null)
  const [editingShirt, setEditingShirt] = useState<Shirt | null>(null)

  // Tie form state
  const [tieForm, setTieForm] = useState({
    title: '',
    description: '',
    image_url: '',
    price: '',
    stock: '',
    category: 'lisa' as 'lisa' | 'desenhada',
    color: ''
  })

  // Shirt form state
  const [shirtForm, setShirtForm] = useState({
    title: '',
    description: '',
    image_url: '',
    collar_type: 'italiano' as 'italiano' | 'frances',
    color: 'branca' as 'branca' | 'preta',
    simple_cuff_price: '',
    simple_cuff_stock: '',
    double_cuff_price: '',
    double_cuff_stock: ''
  })

  const supabase = createClient()

  const fetchProducts = async () => {
    setLoading(true)
    const [tiesResult, shirtsResult] = await Promise.all([
      supabase.from('ties').select('*').order('created_at', { ascending: false }),
      supabase.from('shirts').select('*').order('created_at', { ascending: false })
    ])
    
    if (tiesResult.data) setTies(tiesResult.data)
    if (shirtsResult.data) setShirts(shirtsResult.data)
    setLoading(false)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const resetTieForm = () => {
    setTieForm({
      title: '',
      description: '',
      image_url: '',
      price: '',
      stock: '',
      category: 'lisa',
      color: ''
    })
  }

  const resetShirtForm = () => {
    setShirtForm({
      title: '',
      description: '',
      image_url: '',
      collar_type: 'italiano',
      color: 'branca',
      simple_cuff_price: '',
      simple_cuff_stock: '',
      double_cuff_price: '',
      double_cuff_stock: ''
    })
  }

  // TIE CRUD
  const handleCreateTie = async () => {
    const { error } = await supabase.from('ties').insert({
      title: tieForm.title,
      description: tieForm.description || null,
      image_url: tieForm.image_url || null,
      price: parseFloat(tieForm.price),
      stock: parseInt(tieForm.stock),
      category: tieForm.category,
      color: tieForm.color || null
    })

    if (!error) {
      resetTieForm()
      setModal('none')
      fetchProducts()
    }
  }

  const handleEditTie = async () => {
    if (!editingTie) return

    const { error } = await supabase
      .from('ties')
      .update({
        title: tieForm.title,
        description: tieForm.description || null,
        image_url: tieForm.image_url || null,
        price: parseFloat(tieForm.price),
        stock: parseInt(tieForm.stock),
        category: tieForm.category,
        color: tieForm.color || null,
        updated_at: new Date().toISOString()
      })
      .eq('id', editingTie.id)

    if (!error) {
      resetTieForm()
      setEditingTie(null)
      setModal('none')
      fetchProducts()
    }
  }

  const handleDeleteTie = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta gravata?')) return
    
    await supabase.from('ties').delete().eq('id', id)
    fetchProducts()
  }

  const openEditTie = (tie: Tie) => {
    setEditingTie(tie)
    setTieForm({
      title: tie.title,
      description: tie.description || '',
      image_url: tie.image_url || '',
      price: tie.price.toString(),
      stock: tie.stock.toString(),
      category: tie.category as 'lisa' | 'desenhada',
      color: tie.color || ''
    })
    setModal('edit-tie')
  }

  // SHIRT CRUD
  const handleCreateShirt = async () => {
    const { error } = await supabase.from('shirts').insert({
      title: shirtForm.title,
      description: shirtForm.description || null,
      image_url: shirtForm.image_url || null,
      collar_type: shirtForm.collar_type,
      color: shirtForm.color,
      simple_cuff_price: parseFloat(shirtForm.simple_cuff_price),
      simple_cuff_stock: parseInt(shirtForm.simple_cuff_stock),
      double_cuff_price: parseFloat(shirtForm.double_cuff_price),
      double_cuff_stock: parseInt(shirtForm.double_cuff_stock)
    })

    if (!error) {
      resetShirtForm()
      setModal('none')
      fetchProducts()
    }
  }

  const handleEditShirt = async () => {
    if (!editingShirt) return

    const { error } = await supabase
      .from('shirts')
      .update({
        title: shirtForm.title,
        description: shirtForm.description || null,
        image_url: shirtForm.image_url || null,
        collar_type: shirtForm.collar_type,
        color: shirtForm.color,
        simple_cuff_price: parseFloat(shirtForm.simple_cuff_price),
        simple_cuff_stock: parseInt(shirtForm.simple_cuff_stock),
        double_cuff_price: parseFloat(shirtForm.double_cuff_price),
        double_cuff_stock: parseInt(shirtForm.double_cuff_stock),
        updated_at: new Date().toISOString()
      })
      .eq('id', editingShirt.id)

    if (!error) {
      resetShirtForm()
      setEditingShirt(null)
      setModal('none')
      fetchProducts()
    }
  }

  const handleDeleteShirt = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta camisa?')) return
    
    await supabase.from('shirts').delete().eq('id', id)
    fetchProducts()
  }

  const openEditShirt = (shirt: Shirt) => {
    setEditingShirt(shirt)
    setShirtForm({
      title: shirt.title,
      description: shirt.description || '',
      image_url: shirt.image_url || '',
      collar_type: shirt.collar_type as 'italiano' | 'frances',
      color: shirt.color as 'branca' | 'preta',
      simple_cuff_price: shirt.simple_cuff_price.toString(),
      simple_cuff_stock: shirt.simple_cuff_stock.toString(),
      double_cuff_price: shirt.double_cuff_price.toString(),
      double_cuff_stock: shirt.double_cuff_stock.toString()
    })
    setModal('edit-shirt')
  }

  const toggleTieActive = async (tie: Tie) => {
    await supabase
      .from('ties')
      .update({ active: !tie.active })
      .eq('id', tie.id)
    fetchProducts()
  }

  const toggleShirtActive = async (shirt: Shirt) => {
    await supabase
      .from('shirts')
      .update({ active: !shirt.active })
      .eq('id', shirt.id)
    fetchProducts()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl text-primary">
              Gerenciar Produtos
            </h1>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab('ties')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'ties'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Gravatas ({ties.length})
            </button>
            <button
              onClick={() => setActiveTab('shirts')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'shirts'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Camisas ({shirts.length})
            </button>
          </div>

          {/* Add Button */}
          <div className="mb-6">
            <Button
              onClick={() => {
                if (activeTab === 'ties') {
                  resetTieForm()
                  setModal('create-tie')
                } else {
                  resetShirtForm()
                  setModal('create-shirt')
                }
              }}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {activeTab === 'ties' ? 'Adicionar Gravata' : 'Adicionar Camisa'}
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          ) : (
            <>
              {/* Ties List */}
              {activeTab === 'ties' && (
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-medium">Produto</th>
                        <th className="text-left p-4 font-medium">Categoria</th>
                        <th className="text-left p-4 font-medium">Preço</th>
                        <th className="text-left p-4 font-medium">Estoque</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-right p-4 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ties.map(tie => (
                        <tr key={tie.id} className="border-t border-border">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {tie.image_url && (
                                <img
                                  src={tie.image_url}
                                  alt={tie.title}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <span className="font-medium">{tie.title}</span>
                            </div>
                          </td>
                          <td className="p-4 capitalize">{tie.category}</td>
                          <td className="p-4">{formatPrice(tie.price)}</td>
                          <td className="p-4">{tie.stock}</td>
                          <td className="p-4">
                            <button
                              onClick={() => toggleTieActive(tie)}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                tie.active
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {tie.active ? 'Ativo' : 'Inativo'}
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => openEditTie(tie)}
                              className="text-accent hover:text-accent/80 mr-3"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteTie(tie.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                      {ties.length === 0 && (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-muted-foreground">
                            Nenhuma gravata cadastrada
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Shirts List */}
              {activeTab === 'shirts' && (
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-medium">Produto</th>
                        <th className="text-left p-4 font-medium">Colarinho</th>
                        <th className="text-left p-4 font-medium">Cor</th>
                        <th className="text-left p-4 font-medium">Punho Simples</th>
                        <th className="text-left p-4 font-medium">Punho Duplo</th>
                        <th className="text-left p-4 font-medium">Status</th>
                        <th className="text-right p-4 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shirts.map(shirt => (
                        <tr key={shirt.id} className="border-t border-border">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              {shirt.image_url && (
                                <img
                                  src={shirt.image_url}
                                  alt={shirt.title}
                                  className="w-12 h-12 object-cover rounded"
                                />
                              )}
                              <span className="font-medium">{shirt.title}</span>
                            </div>
                          </td>
                          <td className="p-4 capitalize">{shirt.collar_type}</td>
                          <td className="p-4 capitalize">{shirt.color}</td>
                          <td className="p-4">
                            <div>{formatPrice(shirt.simple_cuff_price)}</div>
                            <div className="text-sm text-muted-foreground">{shirt.simple_cuff_stock} un.</div>
                          </td>
                          <td className="p-4">
                            <div>{formatPrice(shirt.double_cuff_price)}</div>
                            <div className="text-sm text-muted-foreground">{shirt.double_cuff_stock} un.</div>
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => toggleShirtActive(shirt)}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                shirt.active
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-red-100 text-red-700'
                              }`}
                            >
                              {shirt.active ? 'Ativo' : 'Inativo'}
                            </button>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => openEditShirt(shirt)}
                              className="text-accent hover:text-accent/80 mr-3"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteShirt(shirt.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Excluir
                            </button>
                          </td>
                        </tr>
                      ))}
                      {shirts.length === 0 && (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-muted-foreground">
                            Nenhuma camisa cadastrada
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Modal: Create/Edit Tie */}
      {(modal === 'create-tie' || modal === 'edit-tie') && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-serif text-primary mb-6">
              {modal === 'create-tie' ? 'Nova Gravata' : 'Editar Gravata'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título *</label>
                <Input
                  value={tieForm.title}
                  onChange={(e) => setTieForm({ ...tieForm, title: e.target.value })}
                  placeholder="Ex: Gravata Azul Royal Lisa"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea
                  value={tieForm.description}
                  onChange={(e) => setTieForm({ ...tieForm, description: e.target.value })}
                  placeholder="Descrição do produto..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                <Input
                  value={tieForm.image_url}
                  onChange={(e) => setTieForm({ ...tieForm, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Preço (R$) *</label>
                  <Input
                    type="number"
                    step="0.01"
                    value={tieForm.price}
                    onChange={(e) => setTieForm({ ...tieForm, price: e.target.value })}
                    placeholder="49.90"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Estoque *</label>
                  <Input
                    type="number"
                    value={tieForm.stock}
                    onChange={(e) => setTieForm({ ...tieForm, stock: e.target.value })}
                    placeholder="10"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <select
                    value={tieForm.category}
                    onChange={(e) => setTieForm({ ...tieForm, category: e.target.value as 'lisa' | 'desenhada' })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="lisa">Lisa</option>
                    <option value="desenhada">Desenhada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cor</label>
                  <Input
                    value={tieForm.color}
                    onChange={(e) => setTieForm({ ...tieForm, color: e.target.value })}
                    placeholder="Ex: Azul Royal"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setModal('none')
                  resetTieForm()
                  setEditingTie(null)
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={modal === 'create-tie' ? handleCreateTie : handleEditTie}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={!tieForm.title || !tieForm.price || !tieForm.stock}
              >
                {modal === 'create-tie' ? 'Criar' : 'Salvar'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create/Edit Shirt */}
      {(modal === 'create-shirt' || modal === 'edit-shirt') && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-serif text-primary mb-6">
              {modal === 'create-shirt' ? 'Nova Camisa' : 'Editar Camisa'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título *</label>
                <Input
                  value={shirtForm.title}
                  onChange={(e) => setShirtForm({ ...shirtForm, title: e.target.value })}
                  placeholder="Ex: Camisa Social Branca"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Textarea
                  value={shirtForm.description}
                  onChange={(e) => setShirtForm({ ...shirtForm, description: e.target.value })}
                  placeholder="Descrição do produto..."
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                <Input
                  value={shirtForm.image_url}
                  onChange={(e) => setShirtForm({ ...shirtForm, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Colarinho</label>
                  <select
                    value={shirtForm.collar_type}
                    onChange={(e) => setShirtForm({ ...shirtForm, collar_type: e.target.value as 'italiano' | 'frances' })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="italiano">Italiano</option>
                    <option value="frances">Francês</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Cor</label>
                  <select
                    value={shirtForm.color}
                    onChange={(e) => setShirtForm({ ...shirtForm, color: e.target.value as 'branca' | 'preta' })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="branca">Branca</option>
                    <option value="preta">Preta</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-border pt-4 mt-4">
                <h3 className="font-medium mb-3">Punho Simples</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Preço (R$) *</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={shirtForm.simple_cuff_price}
                      onChange={(e) => setShirtForm({ ...shirtForm, simple_cuff_price: e.target.value })}
                      placeholder="89.90"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Estoque *</label>
                    <Input
                      type="number"
                      value={shirtForm.simple_cuff_stock}
                      onChange={(e) => setShirtForm({ ...shirtForm, simple_cuff_stock: e.target.value })}
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <h3 className="font-medium mb-3">Punho Duplo</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Preço (R$) *</label>
                    <Input
                      type="number"
                      step="0.01"
                      value={shirtForm.double_cuff_price}
                      onChange={(e) => setShirtForm({ ...shirtForm, double_cuff_price: e.target.value })}
                      placeholder="99.90"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Estoque *</label>
                    <Input
                      type="number"
                      value={shirtForm.double_cuff_stock}
                      onChange={(e) => setShirtForm({ ...shirtForm, double_cuff_stock: e.target.value })}
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setModal('none')
                  resetShirtForm()
                  setEditingShirt(null)
                }}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                onClick={modal === 'create-shirt' ? handleCreateShirt : handleEditShirt}
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={
                  !shirtForm.title || 
                  !shirtForm.simple_cuff_price || 
                  !shirtForm.simple_cuff_stock ||
                  !shirtForm.double_cuff_price ||
                  !shirtForm.double_cuff_stock
                }
              >
                {modal === 'create-shirt' ? 'Criar' : 'Salvar'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
