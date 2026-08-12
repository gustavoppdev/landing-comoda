/**
 * 08 CTA final — spec.md §3.
 *
 * Fundo carvão (`--primary`, plan.md §2) e o par mais arejado de padding da
 * página (`.section-block-cta`, terceira exceção de plan.md §1.2): é a seção
 * mais vazia, por decisão de ritmo.
 *
 * Último CTA da página — o rodapé não tem botão (spec.md §3). Ênfase
 * `waInverted`, a única ocorrência desta ênfase, porque é o único fundo escuro
 * sólido (plan.md §1.5).
 *
 * O texto de apoio usa `--on-dark-muted` (#A8A69C, 6,46:1 sobre o carvão): o
 * `--muted-foreground` da paleta é #6B6B63 e reprovaria AA aqui.
 */

import { WhatsappButton } from "@/components/WhatsappButton";

export function FinalCta() {
  return (
    <section id="final-cta" className="section-block-cta bg-primary">
      <div className="section-container">
        {/* 720px é medida estrutural desta seção só — não vira utility. */}
        <div className="mx-auto flex max-w-[720px] flex-col items-center gap-[clamp(22px,3vw,32px)] text-center">
          <h2 className="text-h2-cta md:text-h2-cta-lg font-display text-accent text-pretty">
            Sua próxima segunda-feira pode começar numa casa que colabora.
          </h2>

          <p className="text-lead md:text-lead-lg text-on-dark-muted max-w-[460px]">
            Me manda uma foto do ambiente que mais te incomoda. Respondo em até
            2 horas, de segunda a sábado.
          </p>

          <WhatsappButton
            section="finalCta"
            emphasis="waInverted"
            ariaLabel="Falar no WhatsApp e começar a organização da casa"
          />
        </div>
      </div>
    </section>
  );
}
