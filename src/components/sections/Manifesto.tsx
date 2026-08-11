import Image from "next/image";

import gavetaCategorizada from "../../../public/gaveta-categorizada.webp";
import marinaAtendimento from "../../../public/marina-atendimento.webp";

/**
 * 01 Manifesto — spec.md §3.
 *
 * O único bloco da página mais estreito que os 1040px padrão (880px,
 * plan.md §1.2) — daí a `.section-container-narrow`.
 *
 * **Nenhum CTA aqui**, por decisão da spec.md §3: é o respiro da metade de
 * cima, e um botão neste ponto quebra o único intervalo sem pedido.
 *
 * As duas imagens não têm `priority` — só a IMG-01 tem (spec.md §4). O grid
 * empilha por `auto-fit`, sem media query.
 */
export function Manifesto() {
  return (
    <section id="manifesto" className="section-block-airy">
      <div className="section-container-narrow flex flex-col items-center gap-[clamp(26px,4vw,40px)] text-center">
        <p className="text-label text-muted-foreground uppercase">O que muda</p>

        <h2 className="text-h2-manifesto md:text-h2-manifesto-lg font-display text-pretty">
          Organizar não é deixar bonito por uma tarde. É decidir onde cada coisa
          mora e devolver a casa funcionando sozinha.
        </h2>

        <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-[clamp(12px,2vw,20px)]">
          {/* `fill` e não as dimensões do import estático: o arquivo tem
              1122px de largura para um slot de ~420px, e o `sizes` é o que
              faz o next/image pedir o recorte certo. A proporção 4:5 vem do
              wrapper, então o CLS continua zerado. */}
          <div className="relative aspect-4/5 overflow-hidden rounded-lg">
            <Image
              src={gavetaCategorizada}
              alt="Gaveta de cozinha vista de cima, com utensílios separados por categoria em divisórias"
              fill
              sizes="(min-width: 880px) 420px, 100vw"
              className="object-cover"
            />
          </div>

          <div className="relative aspect-4/5 overflow-hidden rounded-lg">
            <Image
              src={marinaAtendimento}
              alt="Marina dobrando uma peça de roupa diante de um closet aberto durante um atendimento"
              fill
              sizes="(min-width: 880px) 420px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Curso livre, nunca registro ou título (spec.md §2): o texto diz o
            nome da pessoa e o histórico, e a formação não vira selo. */}
        <p className="text-lead md:text-lead-lg text-muted-foreground max-w-[520px]">
          Quem chega na sua casa sou eu, Marina Belfort. São 140 casas desde
          2019, quase todas apartamento de família com criança pequena.
        </p>
      </div>
    </section>
  );
}
