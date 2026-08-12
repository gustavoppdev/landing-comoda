import { WhatsappButton } from "@/components/WhatsappButton";

/**
 * 03 Método — spec.md §3.
 *
 * Fundo branco (ritmo de plan.md §2), sem imagem. As quatro etapas são uma
 * `<ol>`: a ordem é o conteúdo desta seção. O marcador nativo sai (`list-none`)
 * porque os números 01-04 já são texto, na coluna fixa de 44px.
 *
 * **Nada aqui parece clicável além do CTA** (plan.md §1.4): as linhas têm borda
 * superior de 1px e poderiam ser lidas como lista de links — por isso não têm
 * hover, `cursor: pointer` nem marcador à direita.
 *
 * O passo 04 é a resposta estrutural à objeção principal da spec.md §1 (a casa
 * volta ao caos em um mês): ele é uma etapa do método, com o mesmo peso das
 * outras três, e não uma cortesia em nota de rodapé.
 */

interface Step {
  /** Exibido na coluna de 44px — o zero à esquerda é parte do design. */
  number: string;
  title: string;
  support: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Visita",
    support:
      "40 minutos na sua casa, ou por vídeo: volume, medidas e a rotina de quem mora ali.",
  },
  {
    number: "02",
    title: "Categorizar",
    support:
      "Você decide o que sai. Eu não descarto nada sozinha, e nada some sem você ver.",
  },
  {
    number: "03",
    title: "Sistema e mapa",
    support:
      "Cada categoria ganha um lugar definido, e você recebe o mapa da casa por escrito.",
  },
  {
    number: "04",
    title: "Revisão em 30 dias",
    support:
      "Volto para ajustar o que a rotina real desmontou. Já está no valor do pacote.",
  },
];

export function Method() {
  return (
    <section id="method" className="section-block">
      <div className="section-container flex flex-col gap-[clamp(30px,4vw,48px)]">
        <div className="flex max-w-[600px] flex-col gap-[18px]">
          <p className="text-label text-muted-foreground uppercase">
            Como funciona
          </p>

          <h2 className="text-h2 md:text-h2-lg font-display">
            Quatro etapas, e a última é 30 dias depois.
          </h2>
        </div>

        <ol className="flex list-none flex-col">
          {steps.map((step) => (
            <li
              key={step.number}
              className="border-border grid grid-cols-[44px_1fr] items-baseline gap-[clamp(14px,2vw,28px)] border-t py-[clamp(22px,3vw,30px)] last:border-b"
            >
              {/* Rótulo de etapa: o token de label da plan.md §1.3 no lugar do
                  #B3B0A6 do hi-fi, que não é token e mede ~2,1:1 sobre branco. */}
              <span className="text-label text-muted-foreground">
                {step.number}
              </span>

              <div className="flex flex-wrap items-baseline gap-x-[28px] gap-y-[8px]">
                <h3 className="text-h3 md:text-h3-lg font-display min-w-[190px]">
                  {step.title}
                </h3>

                <p className="text-body md:text-body-lg text-muted-foreground min-w-[240px] flex-1">
                  {step.support}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <WhatsappButton
          section="method"
          emphasis="waOutline"
          className="self-start"
          ariaLabel="Falar no WhatsApp sobre o passo a passo do serviço"
        />
      </div>
    </section>
  );
}
