-- Tabela de Gravatas
CREATE TABLE IF NOT EXISTS public.ties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'lisa',
  color TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Camisas
CREATE TABLE IF NOT EXISTS public.shirts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  collar_type TEXT NOT NULL,
  color TEXT DEFAULT 'branca',
  simple_cuff_price DECIMAL(10,2) NOT NULL,
  simple_cuff_stock INTEGER NOT NULL DEFAULT 0,
  double_cuff_price DECIMAL(10,2) NOT NULL,
  double_cuff_stock INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.ties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shirts ENABLE ROW LEVEL SECURITY;

-- Policies para leitura pública
DROP POLICY IF EXISTS "Allow public read ties" ON public.ties;
CREATE POLICY "Allow public read ties" ON public.ties FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public read shirts" ON public.shirts;
CREATE POLICY "Allow public read shirts" ON public.shirts FOR SELECT USING (true);

-- Policies para escrita (usando anon para teste, depois pode-se restringir)
DROP POLICY IF EXISTS "Allow all insert ties" ON public.ties;
CREATE POLICY "Allow all insert ties" ON public.ties FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all update ties" ON public.ties;
CREATE POLICY "Allow all update ties" ON public.ties FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow all delete ties" ON public.ties;
CREATE POLICY "Allow all delete ties" ON public.ties FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow all insert shirts" ON public.shirts;
CREATE POLICY "Allow all insert shirts" ON public.shirts FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all update shirts" ON public.shirts;
CREATE POLICY "Allow all update shirts" ON public.shirts FOR UPDATE USING (true);

DROP POLICY IF EXISTS "Allow all delete shirts" ON public.shirts;
CREATE POLICY "Allow all delete shirts" ON public.shirts FOR DELETE USING (true);
