import { Pool } from 'pg'

async function setupDatabase() {
  const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: { rejectUnauthorized: false }
  })

  console.log('Conectando ao banco de dados...')

  try {
    const client = await pool.connect()
    console.log('Conectado! Criando tabelas...')

    // Criar tabela de gravatas
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.ties (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        price DECIMAL(10,2) NOT NULL DEFAULT 0,
        stock INTEGER NOT NULL DEFAULT 0,
        category TEXT NOT NULL DEFAULT 'lisa',
        color TEXT,
        active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `)
    console.log('Tabela ties criada!')

    // Criar tabela de camisas
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.shirts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        image_url TEXT,
        collar_type TEXT NOT NULL DEFAULT 'italiano',
        color TEXT NOT NULL DEFAULT 'branca',
        simple_cuff_price DECIMAL(10,2) NOT NULL DEFAULT 0,
        simple_cuff_stock INTEGER NOT NULL DEFAULT 0,
        double_cuff_price DECIMAL(10,2) NOT NULL DEFAULT 0,
        double_cuff_stock INTEGER NOT NULL DEFAULT 0,
        active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `)
    console.log('Tabela shirts criada!')

    // Habilitar RLS
    await client.query(`ALTER TABLE public.ties ENABLE ROW LEVEL SECURITY;`)
    await client.query(`ALTER TABLE public.shirts ENABLE ROW LEVEL SECURITY;`)
    console.log('RLS habilitado!')

    // Criar políticas de leitura pública
    await client.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ties_select_active') THEN
          CREATE POLICY ties_select_active ON public.ties FOR SELECT USING (active = true);
        END IF;
      END $$;
    `)
    await client.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'shirts_select_active') THEN
          CREATE POLICY shirts_select_active ON public.shirts FOR SELECT USING (active = true);
        END IF;
      END $$;
    `)
    console.log('Políticas de leitura criadas!')

    // Criar políticas para todas as operações (admin via service role)
    await client.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'ties_all_service_role') THEN
          CREATE POLICY ties_all_service_role ON public.ties FOR ALL USING (true) WITH CHECK (true);
        END IF;
      END $$;
    `)
    await client.query(`
      DO $$ 
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'shirts_all_service_role') THEN
          CREATE POLICY shirts_all_service_role ON public.shirts FOR ALL USING (true) WITH CHECK (true);
        END IF;
      END $$;
    `)
    console.log('Políticas de admin criadas!')

    client.release()
    console.log('Setup completo!')
  } catch (error) {
    console.error('Erro:', error)
  } finally {
    await pool.end()
  }
}

setupDatabase()
