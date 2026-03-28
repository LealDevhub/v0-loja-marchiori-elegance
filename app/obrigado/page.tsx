import Link from "next/link"
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import Footer from "@/components/footer"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-14 h-14 text-green-600" />
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary mb-6">
              Obrigado pelo seu pedido!
            </h1>

            {/* Message */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Seu pedido foi enviado com sucesso para nosso WhatsApp. 
              Agora é só aguardar o atendimento do nosso time.
            </p>

            {/* Instructions Card */}
            <div className="bg-primary rounded-2xl p-6 sm:p-8 mb-8 text-left">
              <h2 className="font-serif text-xl text-gold mb-4 flex items-center gap-3">
                <MessageCircle className="w-6 h-6" />
                Próximos Passos
              </h2>
              <ul className="space-y-4 text-gold/80">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold text-sm font-medium">
                    1
                  </span>
                  <span>
                    Acesse a conversa no WhatsApp que acabou de abrir
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold text-sm font-medium">
                    2
                  </span>
                  <span>
                    Aguarde nosso vendedor confirmar a disponibilidade dos produtos
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold text-sm font-medium">
                    3
                  </span>
                  <span>
                    Você receberá o link de pagamento ou a chave PIX para finalizar a compra
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-gold text-sm font-medium">
                    4
                  </span>
                  <span>
                    Após o pagamento, seu pedido será preparado e enviado
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="bg-muted rounded-xl p-6 mb-8">
              <p className="text-muted-foreground text-sm mb-2">
                Precisa de ajuda? Entre em contato conosco:
              </p>
              <a 
                href="https://wa.me/5511972547572" 
                target="_blank" 
                className="text-primary font-medium hover:underline"
              >
                +55 (11) 97254-7572
              </a>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-gold"
              >
                <Link href="/">
                  Voltar para a Loja
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-primary text-gold hover:bg-primary/90"
              >
                <a href="https://wa.me/5511972547572" target="_blank">
                  Abrir WhatsApp
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
