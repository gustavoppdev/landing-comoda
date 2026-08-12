import Image from "next/image";

import cozinhaOrganizada from "../../../public/cozinha-organizada.webp";

/**
 * 04 Prova — spec.md §3.
 *
 * Sem rótulo e sem `<h2>`: os três números falam sozinhos e a ausência é
 * intencional (spec.md §5). Sem CTA e sem nome próprio — a prova aqui é
 * agregada; as pessoas nomeadas ficam na 06 (Depoimentos).
 *
 * A faixa da IMG-04 é irmã do bloco de números dentro da mesma `<section>`:
 * ela é full-bleed (fora de qualquer container) e **não recebe texto
 * sobreposto** — é pausa visual, não conteúdo. Sem `priority`: só a IMG-01
 * tem (spec.md §4).
 */

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "140", label: "casas organizadas desde 2019" },
  { value: "6", label: "anos dedicados só a isso" },
  { value: "30", label: "dias de revisão inclusa" },
];

export function Proof() {
  return (
    <section id="proof" className="flex flex-col">
      {/* `fill` e não as dimensões do import estático: o arquivo é bem maior
          que a faixa, e o `sizes` é o que faz o next/image pedir o recorte
          certo. A altura vem do wrapper, então o CLS continua zerado. */}
      <div className="relative h-[clamp(240px,42vw,460px)] w-full overflow-hidden">
        <Image
          src={cozinhaOrganizada}
          alt="Bancada de cozinha organizada, com potes de mantimentos alinhados em prateleira aberta"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Padding assimétrico: a faixa já dá o respiro do topo, então o topo é
          menor que o `.section-block` padrão e só a base segue o teto de
          124px de plan.md §1.2. */}
      <div className="pt-[clamp(40px,6vw,72px)] pb-[clamp(72px,10vw,124px)]">
        <ul className="section-container grid list-none grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-[clamp(28px,4vw,48px)]">
          {stats.map((stat) => (
            <li key={stat.value} className="flex flex-col gap-[8px]">
              <span className="text-stat md:text-stat-lg font-display">
                {stat.value}
              </span>

              <span className="text-body text-muted-foreground">
                {stat.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
