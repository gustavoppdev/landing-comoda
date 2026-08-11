import Image from "next/image";

import heroSala from "../../../public/hero-sala.webp";
import { WhatsappButton } from "@/components/WhatsappButton";
import { clientConfig } from "@/config";

/**
 * 00 Hero — spec.md §3. Único `<h1>` da página.
 *
 * A IMG-01 é o elemento de LCP (spec.md §4) e a ÚNICA imagem com `priority`
 * na página inteira. Import estático: as dimensões vêm do arquivo e o CLS
 * fica zerado sem `width`/`height` escritos à mão.
 *
 * Altura: o hi-fi declara `min-height` duas vezes (88svh e 640px) e a segunda
 * anula a primeira; `max()` entrega as duas leituras do tasks.md.
 *
 * O wordmark é `<div>`, não link e não `<nav>` (AGENTS.md §3.3) — e fica no
 * mesmo container de 1040px do bloco de texto.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="hero-shell relative flex min-h-[max(88svh,640px)] flex-col justify-between overflow-hidden"
    >
      <Image
        src={heroSala}
        alt="Sala de estar clara e organizada, com sofá de linho e estante com espaço livre entre os livros"
        fill
        priority
        sizes="100vw"
        // 35% e não `center`: mantém os dois terços superiores lisos e empurra
        // o mobiliário para a base, onde o gradiente entra (plan.md §1.6).
        className="object-cover object-[center_35%]"
      />

      {/* Cobre 62% da altura, a partir da base — o terço inferior é o que
          recebe texto. `aria-hidden` implícito: é uma div sem conteúdo. */}
      <div className="hero-scrim pointer-events-none absolute inset-x-0 bottom-0 h-[62%]" />

      <div className="section-container relative flex justify-center">
        <div className="text-wordmark md:text-wordmark-lg font-display ps-[0.42em] text-background uppercase">
          {clientConfig.businessName}
        </div>
      </div>

      <div className="section-container relative">
        <div className="flex max-w-[660px] flex-col gap-[clamp(18px,2.6vw,26px)]">
          <h1 className="text-h1 md:text-h1-lg font-display text-background text-pretty">
            Sua casa organizada de um jeito que se mantém.
          </h1>

          <p className="text-lead md:text-lead-lg max-w-[430px] text-background/85">
            Organização residencial na zona oeste de São Paulo, com o mapa de
            onde cada coisa mora e revisão inclusa 30 dias depois.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <WhatsappButton
              section="hero"
              emphasis="waSolid"
              onMedia
              ariaLabel="Falar no WhatsApp para organizar minha casa"
            />
            {/* Faixa de preço: texto de apoio do CTA — a restrição que mantém
                a exceção 2 da spec.md §1 de pé. Tamanho e peso são os do
                `text-price-tag` (plan.md §1.3): 11px contra os 15px da
                subheadline. O peso da fonte, esse, é 400 contra 300 — a spec §4
                pede "peso menor" e o plano dá o contrário; a divergência está
                no diário do tasks.md. O valor vem do config, a mesma chave que
                a seção de pacotes lê (plan.md §4). */}
            <p className="text-price-tag text-background/75 uppercase">
              {clientConfig.prices.oneRoom} · um ambiente
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
