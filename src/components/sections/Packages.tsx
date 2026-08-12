import { WhatsappButton } from "@/components/WhatsappButton";
import { clientConfig } from "@/config";

/**
 * 05 Pacotes — spec.md §3.
 *
 * Faixa creme (ritmo de plan.md §2), sem imagem. Os três pacotes são **linhas**,
 * não cards: mesma marcação do método, com o preço à direita e a descrição à
 * esquerda. A borda é `--border-warm` porque o fundo é creme — o `@layer base`
 * do globals.css aplica `border-border` em `*`, então a classe é obrigatória em
 * cada linha.
 *
 * `<ul>` e não `<ol>`: ao contrário das quatro etapas do método, os pacotes não
 * têm ordem obrigatória — são três entradas equivalentes.
 *
 * Como no método, nada aqui parece clicável além do CTA (plan.md §1.4): sem
 * hover, sem `cursor: pointer`, sem marcador à direita.
 *
 * Os preços vêm do config.ts — `oneRoom` é a mesma chave que o hero lê, para
 * que os dois não divirjam no primeiro reajuste (plan.md §4).
 */

interface Package {
  name: string;
  /** Marcador de texto, não badge — só o "Casa toda" tem (spec.md §3). */
  highlight?: string;
  includes: string;
  price: string;
}

const packages: Package[] = [
  {
    name: "Um ambiente",
    includes:
      "Cozinha, closet ou home office. Uma diária, mapa do ambiente e revisão em 30 dias.",
    price: clientConfig.prices.oneRoom,
  },
  {
    name: "Casa toda",
    highlight: "Mais pedido",
    includes:
      "Todos os ambientes em 3 a 5 diárias, em etapas que não param a casa. Mapa completo e revisão.",
    price: clientConfig.prices.wholeHouse,
  },
  {
    name: "Mudança",
    includes:
      "Embalo etiquetado na casa antiga e desembalo já organizado na nova.",
    price: clientConfig.prices.moving,
  },
];

export function Packages() {
  return (
    <section
      id="packages"
      className="section-block bg-card text-card-foreground"
    >
      <div className="section-container flex flex-col gap-[clamp(30px,4vw,44px)]">
        <div className="flex flex-col gap-[18px]">
          <p className="text-label text-muted-foreground uppercase">Pacotes</p>

          <h2 className="text-h2 md:text-h2-lg font-display">
            Escolha por onde começar.
          </h2>
        </div>

        <ul className="flex list-none flex-col">
          {packages.map((pkg) => (
            <li
              key={pkg.name}
              className="border-border-warm flex flex-wrap items-baseline gap-x-[32px] gap-y-[14px] border-t py-[clamp(24px,3.2vw,34px)] last:border-b"
            >
              <div className="flex min-w-[260px] flex-1 flex-col gap-[10px]">
                <div className="flex flex-wrap items-baseline gap-x-[14px] gap-y-[6px]">
                  <h3 className="text-h3 md:text-h3-lg font-display">
                    {pkg.name}
                  </h3>

                  {/* Marcador de texto, no token de label da plan.md §1.3 — o
                      #A8A294 do hi-fi não é token e reprova AA sobre creme. */}
                  {pkg.highlight ? (
                    <span className="text-label text-muted-foreground uppercase">
                      {pkg.highlight}
                    </span>
                  ) : null}
                </div>

                <p className="text-body md:text-body-lg text-muted-foreground max-w-[520px]">
                  {pkg.includes}
                </p>
              </div>

              <p className="text-price md:text-price-lg font-display whitespace-nowrap">
                {pkg.price}
              </p>
            </li>
          ))}
        </ul>

        {/* Sem esta nota a faixa vira tabela de preço fechado (tasks.md). */}
        <p className="text-body text-muted-foreground max-w-[560px]">
          O valor fecha depois da visita: depende de metragem e de volume, e eu
          prefiro dizer o número certo uma vez.
        </p>

        <WhatsappButton
          section="offer"
          emphasis="waSolid"
          className="self-start"
          ariaLabel="Falar no WhatsApp sobre os valores dos pacotes"
        />
      </div>
    </section>
  );
}
