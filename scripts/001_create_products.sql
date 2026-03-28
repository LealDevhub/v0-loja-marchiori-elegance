-- Tabela de Gravatas
CREATE TABLE IF NOT EXISTS public.ties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT CHECK (category IN ('lisa', 'desenhada')) DEFAULT 'lisa',
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
  collar_type TEXT CHECK (collar_type IN ('italiano', 'frances')) NOT NULL,
  color TEXT CHECK (color IN ('branca', 'preta')) DEFAULT 'branca',
  -- Punho Simples
  simple_cuff_price DECIMAL(10,2) NOT NULL,
  simple_cuff_stock INTEGER NOT NULL DEFAULT 0,
  -- Punho Duplo
  double_cuff_price DECIMAL(10,2) NOT NULL,
  double_cuff_stock INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de Tamanhos de Camisas (estoque por tamanho)
CREATE TABLE IF NOT EXISTS public.shirt_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shirt_id UUID NOT NULL REFERENCES public.shirts(id) ON DELETE CASCADE,
  size INTEGER CHECK (size >= 0 AND size <= 6) NOT NULL,
  simple_cuff_stock INTEGER NOT NULL DEFAULT 0,
  double_cuff_stock INTEGER NOT NULL DEFAULT 0,
  UNIQUE(shirt_id, size)
);

-- Enable RLS
ALTER TABLE public.ties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shirts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shirt_sizes ENABLE ROW LEVEL SECURITY;

-- Policies para leitura pública (qualquer pessoa pode ver produtos)
CREATE POLICY "Allow public read ties" ON public.ties FOR SELECT USING (active = true);
CREATE POLICY "Allow public read shirts" ON public.shirts FOR SELECT USING (active = true);
CREATE POLICY "Allow public read shirt_sizes" ON public.shirt_sizes FOR SELECT USING (true);

-- Policies para admin (usando service role key para operações de admin)
-- O admin usará o service role key que bypassa RLS

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
DROP TRIGGER IF EXISTS update_ties_updated_at ON public.ties;
CREATE TRIGGER update_ties_updated_at
    BEFORE UPDATE ON public.ties
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_shirts_updated_at ON public.shirts;
CREATE TRIGGER update_shirts_updated_at
    BEFORE UPDATE ON public.shirts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Inserir alguns produtos de exemplo
INSERT INTO public.ties (title, description, image_url, price, stock, category, color) VALUES
  ('Gravata Azul Royal Lisa', 'Gravata elegante em tom azul royal com textura quadriculada sutil. Perfeita para ocasiões formais e eventos especiais.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2343-UPsWvsTbwwihs8FpErODzGIh9wm0RB.jpg', 89.90, 15, 'lisa', 'Azul Royal'),
  ('Gravata Bordô Lisa', 'Gravata clássica na cor bordô com acabamento texturizado. Ideal para reuniões e celebrações.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2347-KOXC1T0fEEvThkZlHKhckMrnGIYA7F.jpg', 89.90, 12, 'lisa', 'Bordô'),
  ('Gravata Vermelha Lisa', 'Gravata vermelha vibrante com textura diagonal. Transmite confiança e elegância.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2346-tbXE1oPPwWAafnP5ZtsrEWE3Q5lKPm.jpg', 89.90, 10, 'lisa', 'Vermelha'),
  ('Gravata Roxa Paisley', 'Gravata sofisticada com padrão paisley em tons de roxo e rosa. Design exclusivo para quem busca diferenciação.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2007%20%281%29-9VlnXvNYsGnaK8hAhHXRVmhPAn1ig8.jpg', 99.90, 8, 'desenhada', 'Roxa'),
  ('Gravata Verde Paisley', 'Gravata elegante com padrão paisley em verde escuro. Sofisticação para momentos únicos.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2332-pS44O1CDSmaKPOVyfEWyfor1Nee3ax.jpg', 99.90, 6, 'desenhada', 'Verde'),
  ('Gravata Azul Marinho Paisley', 'Gravata clássica com padrão paisley em azul marinho. Versátil e elegante para qualquer ocasião.', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_2333-vpZhPNtLRRAKzKS00iNIxOXX6f2n4r.jpg', 99.90, 10, 'desenhada', 'Azul Marinho')
ON CONFLICT DO NOTHING;
