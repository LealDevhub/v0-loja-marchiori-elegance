"use client"

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function SetupDatabasePage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [tableStatus, setTableStatus] = useState<{ties: boolean | null, shirts: boolean | null}>({
    ties: null,
    shirts: null
  })

  const checkTables = async () => {
    setStatus('loading')
    setMessage('Verificando tabelas...')
    
    const supabase = createClient()
    
    // Check ties table
    const { error: tiesError } = await supabase.from('ties').select('id').limit(1)
    const tiesExists = !tiesError || !tiesError.message.includes('does not exist')
    
    // Check shirts table
    const { error: shirtsError } = await supabase.from('shirts').select('id').limit(1)
    const shirtsExists = !shirtsError || !shirtsError.message.includes('does not exist')
    
    setTableStatus({ ties: tiesExists, shirts: shirtsExists })
    
    if (tiesExists && shirtsExists) {
      setStatus('success')
      setMessage('Todas as tabelas estão configuradas corretamente!')
    } else {
      setStatus('idle')
      setMessage(`Tabelas faltando: ${!tiesExists ? 'ties' : ''} ${!shirtsExists ? 'shirts' : ''}`.trim())
    }
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
          Configuração do Banco de Dados
        </h1>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-2">Status das Tabelas</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Verifique se as tabelas necessárias existem no banco de dados Supabase.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">Tabela: ties (Gravatas)</span>
              <span className={`text-sm px-2 py-1 rounded ${
                tableStatus.ties === null ? 'bg-muted text-muted-foreground' :
                tableStatus.ties ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {tableStatus.ties === null ? 'Não verificado' : tableStatus.ties ? 'OK' : 'Não existe'}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="font-medium">Tabela: shirts (Camisas)</span>
              <span className={`text-sm px-2 py-1 rounded ${
                tableStatus.shirts === null ? 'bg-muted text-muted-foreground' :
                tableStatus.shirts ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {tableStatus.shirts === null ? 'Não verificado' : tableStatus.shirts ? 'OK' : 'Não existe'}
              </span>
            </div>
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-sm ${
              status === 'success' ? 'bg-green-100 text-green-700' :
              status === 'error' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {message}
            </div>
          )}

          <div className="flex gap-4">
            <Button 
              onClick={checkTables}
              disabled={status === 'loading'}
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {status === 'loading' ? 'Verificando...' : 'Verificar Tabelas'}
            </Button>
          </div>

          {(tableStatus.ties === false || tableStatus.shirts === false) && (
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="font-medium text-foreground mb-3">SQL para criar as tabelas:</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Execute o SQL abaixo no painel do Supabase (SQL Editor):
              </p>
              <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
{`-- Tabela de Gravatas
CREATE TABLE IF NOT EXISTS public.ties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'lisa' CHECK (category IN ('lisa', 'desenhada')),
  color TEXT,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Camisas
CREATE TABLE IF NOT EXISTS public.shirts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  collar_type TEXT NOT NULL DEFAULT 'italiano' CHECK (collar_type IN ('italiano', 'frances')),
  color TEXT NOT NULL DEFAULT 'branca' CHECK (color IN ('branca', 'preta')),
  simple_cuff_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  simple_cuff_stock INTEGER NOT NULL DEFAULT 0,
  double_cuff_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  double_cuff_stock INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Permitir acesso público para leitura (produtos ativos)
ALTER TABLE public.ties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shirts ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública de produtos ativos
CREATE POLICY "Permitir leitura pública de gravatas ativas" 
  ON public.ties FOR SELECT 
  USING (active = true);

CREATE POLICY "Permitir leitura pública de camisas ativas" 
  ON public.shirts FOR SELECT 
  USING (active = true);

-- Política para operações completas (para admin - usando service_role)
CREATE POLICY "Permitir todas operações para service role em ties" 
  ON public.ties FOR ALL 
  USING (true) 
  WITH CHECK (true);

CREATE POLICY "Permitir todas operações para service role em shirts" 
  ON public.shirts FOR ALL 
  USING (true) 
  WITH CHECK (true);`}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
