/**
 * Rodapé — spec.md §3.
 *
 * Sem heading e **sem CTA**: o botão do CTA final é o último da página. O único
 * `<a>` daqui é a política de privacidade — rota legal, que o AGENTS.md §3.3
 * distingue de navegação: peso visual baixo, no fim da página.
 *
 * Fundo #1A1A17 (`--footer`), um degrau abaixo do carvão do CTA final: separa
 * as duas faixas escuras sem borda (plan.md §2).
 *
 * Cores de texto: `--footer-muted` no endereço e `--footer-note` na nota legal.
 * A nota é o menor texto da página (13px, `text-footnote`, a única exceção ao
 * piso de 14px de plan.md §1.3) — e é por isso que o #6F6D65 do hi-fi não
 * serve: 3,36:1 sobre este fundo. Ver o comentário dos tokens no globals.css.
 *
 * O padding inferior (`.footer-block`) reserva a altura da barra fixa mobile.
 */

import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer-block bg-footer">
      <div className="section-container">
        <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-6">
          <div className="flex flex-col gap-[14px]">
            {/* Wordmark, não link — a marca não navega para lugar nenhum. */}
            <p className="text-wordmark font-display text-accent pl-[0.42em] uppercase">
              CÔMODA
            </p>

            <p className="text-footnote text-footer-muted max-w-[420px]">
              Organização residencial · São Paulo, SP — Pinheiros, Vila
              Madalena, Perdizes, Alto de Pinheiros e Higienópolis.
            </p>
          </div>

          <div className="flex flex-col items-start gap-[10px]">
            {/* Texto exato de spec.md §2 — disclaimer reescrito é inválido. */}
            <p className="text-footnote text-footer-note max-w-[300px]">
              Projeto fictício criado para portfólio. Nenhum serviço é
              comercializado nesta página.
            </p>

            {/* Foco visível explícito: este link não passa pelo buttonVariants,
                como o <summary> do FAQ (AGENTS.md §3.10). */}
            <Link
              href="/privacidade"
              className="text-footnote text-on-dark-muted hover:text-accent focus-visible:outline-on-dark-muted rounded-xs underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Política de privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
