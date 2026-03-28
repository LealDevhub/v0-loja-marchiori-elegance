import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl text-primary mb-6">
            Produto nao encontrado
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            O produto que voce esta procurando nao existe ou foi removido.
          </p>
          <Button asChild className="bg-primary text-gold hover:bg-primary/90">
            <Link href="/#gravatas">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Ver todos os produtos
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
