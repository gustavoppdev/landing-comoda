/**
 * Barra fixa de CTA no rodapé do viewport — exceção 1 da spec.md §1.
 *
 * Existe porque entre o CTA do hero e o do método há duas telas de rolagem sem
 * saída. O que mantém a regra de "sem navegação" de pé: um botão só, mesmo
 * texto e mesma mensagem do hero (`mobileBar` = `hero`), nenhum link interno, e
 * nada acima de 900px — o breakpoint estrutural de plan.md §2, o único da
 * página com comportamento e não só tamanho.
 *
 * Fora de `sections/`: não é seção de conteúdo, e por isso também fica fora do
 * `<main>`. Server Component — quem é client é o WhatsappButton.
 *
 * O `env(safe-area-inset-bottom)` vive na `.wa-bar` do globals.css; o padding
 * inferior do rodapé reserva os 72px desta barra (`.footer-block`).
 */

import { WhatsappButton } from "@/components/WhatsappButton";

export function MobileCtaBar() {
  return (
    <div className="wa-bar bg-background/95 border-border fixed inset-x-0 bottom-0 z-20 border-t backdrop-blur-md min-[900px]:hidden">
      <WhatsappButton
        section="mobileBar"
        emphasis="waSolid"
        className="w-full"
        ariaLabel="Falar no WhatsApp sobre organizar a casa"
      />
    </div>
  );
}
