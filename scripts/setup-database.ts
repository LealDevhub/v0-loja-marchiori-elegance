import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log('Configurando banco de dados...')

  // Criar tabela de gravatas
  const { error: tiesError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS ties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        stock INTEGER NOT NULL DEFAULT 0,
        category TEXT NOT NULL DEFAULT 'lisa' CHECK (category IN ('lisa', 'desenhada')),
        color TEXT,
        active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  })

  if (tiesError) {
    console.log('Nota sobre tabela ties:', tiesError.message)
  } else {
    console.log('Tabela ties verificada/criada!')
  }

  // Criar tabela de camisas
  const { error: shirtsError } = await supabase.rpc('exec_sql', {
    sql: `
      CREATE TABLE IF NOT EXISTS shirts (
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
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `
  })

  if (shirtsError) {
    console.log('Nota sobre tabela shirts:', shirtsError.message)
  } else {
    console.log('Tabela shirts verificada/criada!')
  }

  console.log('Setup completo!')
}

setupDatabase()
