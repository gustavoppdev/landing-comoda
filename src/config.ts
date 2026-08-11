/**
 * src/config.ts — fonte única de verdade dos dados do cliente.
 *
 * Nenhum componente contém número, mensagem ou texto de CTA hardcoded
 * (AGENTS.md, Seção 4). Valores vêm de spec.md, Seção 1.
 */

export const clientConfig = {
  /** Nome do negócio — spec.md §1 */
  businessName: "CÔMODA",

  /** Formato internacional, só dígitos: 55 + DDD + número */
  whatsappNumber: "5516992375781",

  /**
   * O MESMO texto em todas as ocorrências da página (AGENTS.md §3.2):
   * repetição gera reconhecimento. Não crie um label por seção — a ênfase
   * visual é que varia, e isso é decisão do plan.md §1.5, não deste arquivo.
   */
  ctaLabel: "Falar no WhatsApp",

  /**
   * A MENSAGEM, ao contrário do label, varia por seção de propósito: é o que
   * permite saber de qual parte da página veio o lead.
   *
   * Uma chave por seção que tem CTA — as cinco abaixo são as de spec.md §1,
   * derivadas das seções da §3. `mobileBar` é idêntica à `hero` por decisão da
   * exceção 1 da spec.md §1: é o mesmo botão, repetido.
   *
   * Estas chaves são contrato duplo — com a spec.md §1 e com o metadado do
   * evento `whatsapp_click`, que o cliente lê no relatório do GA4. Uma vez
   * definidas, renomear quebra os dois.
   *
   * Os colchetes em `offer` são texto da spec, não placeholder: é o lead que
   * escolhe o pacote antes de enviar.
   */
  whatsappMessages: {
    hero: "Oi! Vim pela página da CÔMODA e quero organizar minha casa.",
    method:
      "Oi! Vi como funciona e quero entender o passo a passo pra minha casa.",
    offer: "Oi! Quero saber os valores pra [ambiente único / casa toda / mudança].",
    finalCta: "Oi! Li a página toda e quero começar.",
    /** Barra fixa mobile — idêntica à do hero. */
    mobileBar: "Oi! Vim pela página da CÔMODA e quero organizar minha casa.",
  },

  /**
   * Faixas de preço de spec.md §3. `oneRoom` aparece em dois lugares — a faixa
   * do hero e a linha do pacote — e os dois leem esta chave, para não
   * divergirem no primeiro reajuste (plan.md §4).
   */
  prices: {
    oneRoom: "a partir de R$ 890",
    wholeHouse: "a partir de R$ 3.400",
    moving: "orçamento por metragem",
  },
} as const;

export type WhatsappSection = keyof typeof clientConfig.whatsappMessages;

/** Parâmetros de campanha capturados da URL de entrada. */
export type UtmParams = Record<string, string>;

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/**
 * Extrai os UTMs de uma query string (AGENTS.md §3.11).
 *
 * Recebe a string em vez de ler `window` sozinha para ser pura: quem lê o
 * browser é o componente, via `useSyncExternalStore`.
 */
export function parseUtmParams(search: string): UtmParams {
  const params = new URLSearchParams(search);
  const utm: UtmParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }

  return utm;
}

/** Conveniência para uso fora de componente. No servidor devolve `{}`. */
export function readUtmParams(): UtmParams {
  if (typeof window === "undefined") return {};
  return parseUtmParams(window.location.search);
}

/**
 * Monta o link `wa.me` com a mensagem da seção, URL-encoded.
 *
 * A origem da campanha NÃO entra no texto: o lead veria "(via campanha)" no
 * próprio WhatsApp e o tom da página não sobrevive a isso (plan.md §3). Os UTMs
 * seguem capturados, mas só no evento de analytics.
 */
export function buildWhatsappLink(section: WhatsappSection): string {
  const message = clientConfig.whatsappMessages[section];

  return `https://wa.me/${clientConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
