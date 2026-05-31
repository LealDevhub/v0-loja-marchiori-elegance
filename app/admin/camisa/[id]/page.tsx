"use client"

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { createShirt, updateShirt, getShirt } from '../../actions'

export default function ShirtFormPage() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === 'nova'
  
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    collar_type: 'italiano' as 'italiano' | 'frances',
    color: 'branca' as 'branca' | 'preta',
    simple_cuff_price: '',
    simple_cuff_stock: '',
    double_cuff_price: '',
    double_cuff_stock: '',
    active: true
  })

  useEffect(() => {
    if (!isNew) {
      fetchShirt()
    }
  }, [params.id, isNew])

  const fetchShirt = async () => {
    const result = await getShirt(params.id as string)
    
    if (result.data) {
      setFormData({
        title: result.data.title,
        description: result.data.description || '',
        image_url: result.data.image_url || '',
        collar_type: result.data.collar_type,
        color: result.data.color,
        simple_cuff_price: result.data.simple_cuff_price.toString(),
        simple_cuff_stock: result.data.simple_cuff_stock.toString(),
        double_cuff_price: result.data.double_cuff_price.toString(),
        double_cuff_stock: result.data.double_cuff_stock.toString(),
        active: result.data.active
      })
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const shirtData = {
      title: formData.title,
      description: formData.description || undefined,
      image_url: formData.image_url || undefined,
      collar_type: formData.collar_type,
      color: formData.color,
      simple_cuff_price: parseFloat(formData.simple_cuff_price),
      simple_cuff_stock: parseInt(formData.simple_cuff_stock),
      double_cuff_price: parseFloat(formData.double_cuff_price),
      double_cuff_stock: parseInt(formData.double_cuff_stock),
      active: formData.active,
    }

    let result

    if (isNew) {
      result = await createShirt(shirtData)
    } else {
      result = await updateShirt(params.id as string, shirtData)
    }

    if (result.error) {
      alert(`Erro ao salvar: ${result.error}`)
      setSaving(false)
      return
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
          {isNew ? 'Nova Camisa' : 'Editar Camisa'}
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
              placeholder="Ex: Camisa Social Branca Colarinho Italiano"
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

          {/* Tipo de Colarinho */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tipo de Colarinho *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="collar_type"
                  value="italiano"
                  checked={formData.collar_type === 'italiano'}
                  onChange={(e) => setFormData({ ...formData, collar_type: e.target.value as 'italiano' | 'frances' })}
                  className="w-4 h-4 text-accent"
                />
                <span>Colarinho Italiano</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="collar_type"
                  value="frances"
                  checked={formData.collar_type === 'frances'}
                  onChange={(e) => setFormData({ ...formData, collar_type: e.target.value as 'italiano' | 'frances' })}
                  className="w-4 h-4 text-accent"
                />
                <span>Colarinho Francês</span>
              </label>
            </div>
          </div>

          {/* Cor */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Cor *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value="branca"
                  checked={formData.color === 'branca'}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value as 'branca' | 'preta' })}
                  className="w-4 h-4 text-accent"
                />
                <span>Branca</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="color"
                  value="preta"
                  checked={formData.color === 'preta'}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value as 'branca' | 'preta' })}
                  className="w-4 h-4 text-accent"
                />
                <span>Preta</span>
              </label>
            </div>
          </div>

          {/* Punho Simples */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-4">Punho Simples</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preço (R$) *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.simple_cuff_price}
                  onChange={(e) => setFormData({ ...formData, simple_cuff_price: e.target.value })}
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
                  value={formData.simple_cuff_stock}
                  onChange={(e) => setFormData({ ...formData, simple_cuff_stock: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Punho Duplo */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="font-medium text-foreground mb-4">Punho Duplo</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preço (R$) *
                </label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.double_cuff_price}
                  onChange={(e) => setFormData({ ...formData, double_cuff_price: e.target.value })}
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
                  value={formData.double_cuff_stock}
                  onChange={(e) => setFormData({ ...formData, double_cuff_stock: e.target.value })}
                  placeholder="0"
                  required
                />
              </div>
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
              {saving ? 'Salvando...' : (isNew ? 'Criar Camisa' : 'Salvar Alterações')}
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
