import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { TiesSection } from "@/components/ties-section"
import { ShirtsSection } from "@/components/shirts-section"
import { KitsSection } from "@/components/kits-section"
import { AboutSection } from "@/components/about-section"
import { CTASection } from "@/components/cta-section"
import Footer from "@/components/footer"
import WhatsAppFloat from "@/components/whatsapp-float"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TiesSection />
      <ShirtsSection />
      <KitsSection />
      <AboutSection />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
