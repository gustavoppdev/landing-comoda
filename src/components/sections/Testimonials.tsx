/**
 * 06 Depoimentos — spec.md §3.
 *
 * Sem `<h2>` e sem CTA: o COMODA.dc.html (fonte de verdade visual, spec.md §5)
 * traz só o rótulo "O QUE DIZEM" nesta seção. Fundo branco e o par arejado de
 * padding (`.section-block-airy`), o mesmo do manifesto — as duas seções que
 * respiram (plan.md §1.2 e §2).
 *
 * Três `<figure>` irmãs, sem lista: `<blockquote>` é a fala e `<figcaption>` é
 * a atribuição. Sem card, sem borda, sem aspa decorativa e sem foto de cliente.
 *
 * Cada fala cobre uma objeção diferente — durabilidade, julgamento e mudança
 * (spec.md §3). O serviço registrado na spec não vai para a tela: o rótulo
 * exibido é só "NOME · BAIRRO".
 *
 * Depoimentos fictícios, cobertos pelo aviso de portfólio do rodapé (spec.md §2).
 */

interface Testimonial {
  quote: string;
  /** Só nome e bairro — o serviço fica na spec (spec.md §3). */
  attribution: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      '"Contratei achando que era luxo. Seis meses depois a cozinha continua igual ao dia que ela saiu — porque agora eu sei onde cada coisa vai."',
    attribution: "Renata M. · Pinheiros",
  },
  {
    quote:
      '"Meu medo era ser julgada. Ela abriu armário por armário sem uma única cara feia, e não me deixou jogar nada fora por impulso."',
    attribution: "Juliana T. · Vila Madalena",
  },
  {
    quote:
      '"Mudamos de apartamento numa sexta e no sábado a louça já estava no lugar certo. Foi a mudança menos horrível da minha vida."',
    attribution: "Fernanda A. · Perdizes",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="section-block-airy">
      <div className="section-container">
        {/* 760px é medida estrutural desta seção só — não vira utility. */}
        <div className="mx-auto flex max-w-[760px] flex-col items-center gap-[clamp(48px,7vw,80px)] text-center">
          <p className="text-label text-muted-foreground uppercase">
            O que dizem
          </p>

          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.attribution}
              className="flex flex-col items-center gap-[18px]"
            >
              <blockquote className="text-quote md:text-quote-lg font-display text-pretty">
                {testimonial.quote}
              </blockquote>

              {/* Token de label no lugar do #A5A29A do hi-fi, que não é token e
                  reprova AA sobre branco — mesma decisão das slices 3–7. */}
              <figcaption className="text-label text-muted-foreground uppercase">
                {testimonial.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
