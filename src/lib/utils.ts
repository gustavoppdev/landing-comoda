import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * Os tokens de texto de plan.md §1.3 (`text-cta`, `text-h1`, `text-body`…).
 *
 * O tailwind-merge só conhece a escala default: sem isto ele lê `text-cta` como
 * cor, mantém ao lado dela o `text-sm` que o cva do botão traz na base, e quem
 * decide o tamanho passa a ser a ordem das regras no CSS compilado — que hoje
 * emite `.text-cta` ANTES de `.text-sm`, deixando o CTA em 14px. Registrar o
 * grupo aqui mata a classe de bug em vez de escondê-la atrás da ordem.
 */
const TYPE_SCALE = /^(h1|h2|h2-manifesto|h2-cta|h3|lead|body|label|stat|wordmark|quote|price|price-tag|cta)(-lg)?$/

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: [(value: string) => TYPE_SCALE.test(value)] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
