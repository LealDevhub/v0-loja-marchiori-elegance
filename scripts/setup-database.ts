import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

async function setupDatabase() {
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  
  console.log('Configurando banco de dados...')
  
  // Criar tabela de gravatas
  const { error: tiesError } = await supabase.rpc('exec_sql', {
    sql: `
      DROP TABLE IF EXISTS public.ties CASCADE;
      CREATE TABLE public.ties (
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
      ALTER TABLE public.ties ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow public read on ties" ON public.ties FOR SELECT USING (true);
      CREATE POLICY "Allow all insert on ties" ON public.ties FOR INSERT WITH CHECK (true);
      CREATE POLICY "Allow all update on ties" ON public.ties FOR UPDATE USING (true);
      CREATE POLICY "Allow all delete on ties" ON public.ties FOR DELETE USING (true);
    `
  })
  
  if (tiesError) {
    console.error('Erro ao criar tabela ties:', tiesError)
  } else {
    console.log('Tabela ties criada com sucesso!')
  }
  
  // Criar tabela de camisas
  const { error: shirtsError } = await supabase.rpc('exec_sql', {
    sql: `
      DROP TABLE IF EXISTS public.shirts CASCADE;
      CREATE TABLE public.shirts (
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
      ALTER TABLE public.shirts ENABLE ROW LEVEL SECURITY;
      CREATE POLICY "Allow public read on shirts" ON public.shirts FOR SELECT USING (true);
      CREATE POLICY "Allow all insert on shirts" ON public.shirts FOR INSERT WITH CHECK (true);
      CREATE POLICY "Allow all update on shirts" ON public.shirts FOR UPDATE USING (true);
      CREATE POLICY "Allow all delete on shirts" ON public.shirts FOR DELETE USING (true);
    `
  })
  
  if (shirtsError) {
    console.error('Erro ao criar tabela shirts:', shirtsError)
  } else {
    console.log('Tabela shirts criada com sucesso!')
  }
}

setupDatabase()
