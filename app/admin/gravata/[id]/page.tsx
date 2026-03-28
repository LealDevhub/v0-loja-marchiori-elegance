"use client"

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Tie } from '@/lib/products'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function TieFormPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'nova'
  
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    price: '',
    stock: '',
    category: 'lisa' as 'lisa' | 'desenhada',
    color: '',
    active: true
  })

  useEffect(() => {
    if (!isNew) {
      fetchTie()
    }
  }, [params.id, isNew])

  const fetchTie = async () => {
    const supabase = createClient()
    const { data } = await supabase
      .from('ties')
      .select('*')
      .eq('id', params.id)
      .single()
    
    if (data) {
      setFormData({
        title: data.title,
        description: data.description || '',
        image_url: data.image_url || '',
        price: data.price.toString(),
        stock: data.stock.toString(),
        category: data.category,
        color: data.color || '',
        active: data.active
      })
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const supabase = createClient()
    
    const tieData = {
      title: formData.title,
      description: formData.description || null,
      image_url: formData.image_url || null,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      color: formData.color || null,
      active: formData.active,
      updated_at: new Date().toISOString()
    }

    if (isNew) {
      await supabase.from('ties').insert(tieData)
    } else {
      await supabase.from('ties').update(tieData).eq('id', params.id)
    }

    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full"></div>
      </div>
    )
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
          <Link href="/admin">
            <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              Voltar
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="font-serif text-3xl text-primary mb-8">
          {isNew ? 'Nova Gravata' : 'Editar Gravata'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Título *
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ex: Gravata Azul Royal Lisa"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descrição
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o produto..."
              rows={4}
            />
          </div>

          {/* URL da Imagem */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              URL da Imagem
            </label>
            <Input
              type="url"
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="https://..."
            />
            {formData.image_url && (
              <div className="mt-2">
                <img 
                  src={formData.image_url} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Categoria *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="lisa"
                  checked={formData.category === 'lisa'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'lisa' | 'desenhada' })}
                  className="w-4 h-4 text-accent"
                />
                <span>Gravata Lisa</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value="desenhada"
                  checked={formData.category === 'desenhada'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as 'lisa' | 'desenhada' })}
                  className="w-4 h-4 text-accent"
                />
                <span>Gravata Desenhada</span>
              </label>
            </div>
          </div>

          {/* Cor */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cor
            </label>
            <Input
              type="text"
              value={formData.color}
              onChange={(e) => setFormData({ ...formData, color: e.target.value })}
              placeholder="Ex: Azul Royal, Bordô, Vermelho..."
            />
          </div>

          {/* Preço e Estoque */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Preço (R$) *
              </label>
              <Input
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0,00"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Quantidade em Estoque *
              </label>
              <Input
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
                required
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-5 h-5 rounded text-accent"
              />
              <span className="font-medium">Produto ativo (visível na loja)</span>
            </label>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={saving}
              className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {saving ? 'Salvando...' : (isNew ? 'Criar Gravata' : 'Salvar Alterações')}
            </Button>
            <Link href="/admin" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancelar
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
