/**
 * src/components/WhatsappButton.tsx
 *
 * O único Client Component nosso (AGENTS.md §4). Lê número e mensagens de
 * src/config.ts — nunca hardcode aqui.
 *
 * ───────────────────────────────────────────────────────────────────────────
 * ANTES DE USAR: o estilo do CTA mora em `ui/button.tsx`, não aqui.
 *
 * Acrescente ao cva do preset — as cores vêm de plan.md §1.5, as medidas de
 * plan.md §1.2. Os valores que o preset já tinha ficam intocados:
 *
 *   variant: {
 *     …                            // default, outline, secondary, ghost, …
 *     waSolid:    "bg-primary text-primary-foreground hover:bg-primary/90",
 *     waOutline:  "border border-border bg-transparent text-foreground hover:bg-muted",
 *     waInverted: "bg-accent text-accent-foreground hover:bg-accent/90",
 *   },
 *   size: {
 *     …                            // default, sm, lg, icon, …
 *     cta: "h-12 rounded-full px-6 text-body md:text-body-lg",
 *   },
 *
 * Este componente não estiliza nada: ele escolhe. Concatenar cor ou altura por
 * fora do cva é o que fazia `bg-primary` (do variant default) e `bg-transparent`
 * (da ênfase) chegarem juntos no className — o cn() resolvia a briga, mas só
 * enquanto alguém lembrasse dele. Dentro do cva a briga não existe: uma chave,
 * um valor.
 * ───────────────────────────────────────────────────────────────────────────
 *
 * Por que `buttonVariants` e não `<Button>`: o Button do Base UI aplica
 * `role="button"`, que sobrescreve a semântica de link do `<a>`. Como o destino
 * é externo (wa.me), também não se usa `<Link>` do Next.js — ele não traz ganho
 * fora de navegação interna. Ver AGENTS.md §4.
 *
 * Ícone: `MessageCircle` do lucide é placeholder neutro. Antes do lançamento,
 * troque pelo ícone oficial dos brand assets da Meta — baixe o arquivo, não
 * reproduza o logo de memória.
 */

"use client";

import { useMemo, useSyncExternalStore } from "react";
import { MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  clientConfig,
  buildWhatsappLink,
  parseUtmParams,
  type WhatsappSection,
} from "@/config";

// A query string não muda enquanto a página está aberta: não há nada a que se
// inscrever, então o subscribe é um no-op.
const subscribeToSearch = () => () => {};
const getSearchSnapshot = () => window.location.search;
const getServerSearchSnapshot = () => "";

/**
 * As ênfases registradas em plan.md §1.5 — e só elas.
 *
 * O tipo é EXTRAÍDO do cva de ui/button.tsx, não redigitado: se uma delas não
 * existir lá, `Extract` devolve `never` e todo uso deste componente quebra no
 * typecheck. Uma quarta ênfase também não passa — usá-la exige editar esta
 * união, que é um ato visível na revisão, não um improviso dentro de uma slice
 * (AGENTS.md §3.2).
 */
type ButtonVariant = NonNullable<
  Parameters<typeof buttonVariants>[0]
>["variant"];

export type WhatsappButtonEmphasis = Extract<
  ButtonVariant,
  "waSolid" | "waOutline" | "waInverted"
>;

interface WhatsappButtonProps {
  /** Seção de origem — usada no link e no metadado do evento. */
  section: WhatsappSection;
  /** Ênfase visual, restrita às registradas em plan.md §1.5. */
  emphasis?: WhatsappButtonEmphasis;
  /** Ajuste de LAYOUT desta ocorrência (largura, margem). Nunca cor nem altura. */
  className?: string;
  /**
   * Rótulo acessível desta ocorrência. Numa página com 4 CTAs, o leitor de tela
   * anuncia o mesmo rótulo 4 vezes na lista de links — por isso cada um recebe
   * o CONTEXTO em linguagem humana ("Falar no WhatsApp sobre o pacote de 3
   * meses"), nunca a chave interna ("hero", "finalCta"), que não significa nada
   * para quem ouve.
   */
  ariaLabel?: string;
}

export function WhatsappButton({
  section,
  emphasis = "waSolid",
  className,
  ariaLabel,
}: WhatsappButtonProps) {
  // Os UTMs só existem no browser: o componente é pré-renderizado no build,
  // quando window ainda não existe. useSyncExternalStore é o jeito correto de
  // ler valor externo com snapshot de servidor — no HTML estático o link sai sem
  // UTM (certo para acesso direto) e passa a incluí-los na hidratação, sem o
  // cascading render que useEffect + setState provoca (regra
  // react-hooks/set-state-in-effect do eslint-config-next).
  const search = useSyncExternalStore(
    subscribeToSearch,
    getSearchSnapshot,
    getServerSearchSnapshot,
  );
  const utm = useMemo(() => parseUtmParams(search), [search]);

  function handleClick() {
    // AGENTS.md §3.11. Ajuste conforme a plataforma de plan.md §3.
    if (typeof window !== "undefined" && "gtag" in window) {
      (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag(
        "event",
        "whatsapp_click",
        { section, ...utm },
      );
    }
  }

  return (
    <a
      href={buildWhatsappLink(section, utm)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label={
        ariaLabel ?? `Falar com ${clientConfig.businessName} no WhatsApp`
      }
      // Toda a aparência vem do cva: ênfase pelo `variant`, altura/raio/padding
      // pelo `size: cta` (plan.md §1.2 — o `lg` do preset fica abaixo do alvo de
      // toque de 44px). O cn() aqui existe só para o `className` de layout do
      // call site não brigar com o resultado do cva — `buttonVariants()` é cva
      // puro e não passa por tailwind-merge sozinho.
      className={cn(
        buttonVariants({ variant: emphasis, size: "cta" }),
        className,
      )}
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      {clientConfig.ctaLabel}
    </a>
  );
}
