/**
 * 07 FAQ — spec.md §3.
 *
 * Faixa creme (ritmo de plan.md §2), sem imagem e sem CTA. `<details>`/`<summary>`
 * nativos, nunca o accordion do shadcn (exceção 3 da spec.md §1): a primeira
 * resposta precisa estar no HTML entregue, sem esperar hidratação — é a resposta
 * à objeção principal da spec.md §1.
 *
 * O sinal +/– é derivado do estado (`group-open:after:content`), não texto fixo:
 * um caractere escrito no JSX mentiria assim que alguém abrisse a pergunta.
 *
 * O `padding-block` do hi-fi mora no `<summary>`, não na `<details>`: o `<summary>`
 * é o alvo clicável, e com o padding no pai a área de toque seria só a linha do
 * texto (o mínimo é 44px, AGENTS.md §4). Aberto, o padding de baixo cai para os
 * 14px que o hi-fi usa entre pergunta e resposta.
 *
 * Como nos pacotes, a borda é `--border-warm` porque o fundo é creme — o
 * `@layer base` do globals.css aplica `border-border` em `*`, então a classe é
 * obrigatória em cada linha.
 */

interface FaqItem {
  question: string;
  answer: string;
  /** Só a primeira — a objeção principal da spec.md §1 (exceção 3). */
  open?: boolean;
}

const faqItems: FaqItem[] = [
  {
    question: "E se em um mês voltar ao caos?",
    answer:
      "É a pergunta certa. Por isso o serviço não termina no dia bonito: você fica com o mapa de onde cada categoria mora e eu volto em 30 dias para ajustar o que a rotina real desmontou.",
    open: true,
  },
  {
    question: "Você vai me obrigar a jogar coisas fora?",
    answer:
      "Não. Eu separo, mostro o volume real de cada categoria e a decisão é sempre sua. O que sai pode ir para doação combinada por você.",
  },
  {
    question: "Preciso arrumar antes de você chegar?",
    answer:
      "Pelo contrário: arrumar antes esconde o problema que eu preciso ver. Sua casa do jeito que ela está é o ponto de partida certo.",
  },
  {
    question: "Quais bairros você atende?",
    answer:
      "Pinheiros, Vila Madalena, Perdizes, Alto de Pinheiros e Higienópolis. Fora dessa região, me chame: depende da agenda da semana.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="section-block bg-card text-card-foreground">
      <div className="section-container flex flex-wrap gap-[clamp(28px,4vw,56px)]">
        <div className="flex min-w-[220px] max-w-[320px] flex-1 flex-col gap-[18px]">
          {/* Rótulo no token de label — o #A8A294 do hi-fi não é token e
              reprovaria AA sobre creme (mesma decisão das slices 3-8). */}
          <p className="text-label text-muted-foreground uppercase">Perguntas</p>

          <h2 className="text-h2 md:text-h2-lg font-display">
            O que costumam perguntar antes.
          </h2>
        </div>

        <div className="flex min-w-[280px] flex-[2] flex-col">
          {faqItems.map((item) => (
            <details
              key={item.question}
              open={item.open}
              className="group border-border-warm border-t last:border-b"
            >
              <summary className="text-h3 md:text-h3-lg font-display focus-visible:outline-foreground flex cursor-pointer list-none items-baseline justify-between gap-[20px] py-[clamp(20px,2.6vw,26px)] group-open:pb-[14px] focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
                {item.question}

                {/* O sinal é decorativo: o estado aberto/fechado já é anunciado
                    pelo próprio <details>. */}
                <span
                  aria-hidden="true"
                  className="text-lead text-muted-foreground after:content-['+'] group-open:after:content-['–']"
                />
              </summary>

              <p className="text-body md:text-body-lg text-muted-foreground max-w-[620px] pb-[clamp(20px,2.6vw,26px)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
