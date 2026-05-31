import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ 
      error: 'Variáveis de ambiente não configuradas',
      missing: {
        NEXT_PUBLIC_SUPABASE_URL: !supabaseUrl,
        NEXT_PUBLIC_SUPABASE_ANON_KEY: !supabaseAnonKey
      }
    }, { status: 500 })
  }

  const cookieStore = await cookies()
  
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignorar erros de cookies em Server Components
          }
        },
      },
    }
  )

  try {
    // Testar conexão tentando consultar a tabela ties
    const { data: tiesData, error: tiesError } = await supabase
      .from('ties')
      .select('id')
      .limit(1)

    // Testar tabela shirts também
    const { data: shirtsData, error: shirtsError } = await supabase
      .from('shirts')
      .select('id')
      .limit(1)

    // Se as tabelas não existirem
    if (tiesError?.message?.includes('does not exist') || shirtsError?.message?.includes('does not exist')) {
      return NextResponse.json({
        status: 'tables_missing',
        message: 'As tabelas não existem no banco de dados.',
        supabaseUrl,
        errors: {
          ties: tiesError?.message,
          shirts: shirtsError?.message
        },
        instructions: 'Execute o SQL abaixo no SQL Editor do Supabase:',
        supabase_dashboard: `https://supabase.com/dashboard/project/${supabaseUrl.split('//')[1].split('.')[0]}/sql`,
        sql: `
-- Criar tabela de gravatas (ties)
CREATE TABLE IF NOT EXISTS public.ties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'lisa',
  color TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Criar tabela de camisas (shirts)
CREATE TABLE IF NOT EXISTS public.shirts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  collar_type TEXT NOT NULL DEFAULT 'italiano',
  color TEXT NOT NULL DEFAULT 'branca',
  simple_cuff_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  simple_cuff_stock INTEGER NOT NULL DEFAULT 0,
  double_cuff_price DECIMAL(10, 2) NOT NULL DEFAULT 0,
  double_cuff_stock INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Habilitar RLS
ALTER TABLE public.ties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shirts ENABLE ROW LEVEL SECURITY;

-- Políticas para gravatas
CREATE POLICY "Allow public read on ties" ON public.ties FOR SELECT USING (true);
CREATE POLICY "Allow all insert on ties" ON public.ties FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update on ties" ON public.ties FOR UPDATE USING (true);
CREATE POLICY "Allow all delete on ties" ON public.ties FOR DELETE USING (true);

-- Políticas para camisas
CREATE POLICY "Allow public read on shirts" ON public.shirts FOR SELECT USING (true);
CREATE POLICY "Allow all insert on shirts" ON public.shirts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow all update on shirts" ON public.shirts FOR UPDATE USING (true);
CREATE POLICY "Allow all delete on shirts" ON public.shirts FOR DELETE USING (true);
        `
      })
    }

    // Verificar outros erros
    if (tiesError || shirtsError) {
      return NextResponse.json({
        status: 'error',
        message: 'Erro ao conectar com o banco de dados',
        errors: {
          ties: tiesError?.message,
          shirts: shirtsError?.message
        }
      }, { status: 500 })
    }

    // Conexão bem sucedida
    return NextResponse.json({
      status: 'connected',
      message: 'Conexão com Supabase funcionando! Tabelas existem.',
      supabaseUrl,
      tables: {
        ties: 'OK',
        shirts: 'OK'
      },
      data: {
        tiesCount: tiesData?.length ?? 0,
        shirtsCount: shirtsData?.length ?? 0
      }
    })

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    return NextResponse.json({
      status: 'error',
      error: errorMessage
    }, { status: 500 })
  }
}
