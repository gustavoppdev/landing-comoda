# 0 · foundation

## Decisões assumidas

1. **`pnpm typecheck` não existe** no `package.json` da Parte 2. Em vez de voltar, acrescento `"typecheck": "tsc --noEmit"` — é o portão do `AGENTS.md` §5, não uma remenda de conteúdo.
2. **Karla carrega os pesos 300, 400 e 500**, não só 300/500 como diz a linha do `tasks.md`: `plan.md` §1.3 (dono da tipografia) usa Karla 400 em rótulo, wordmark do rodapé e faixa de preço. Sem o 400 o browser sintetiza.
3. **Geist_Mono sai do `layout.tsx`** — `plan.md` §2 registra "fonte mono não usada". O `--font-mono` do `@theme inline` fica intocado.
4. **`waSolid` resolve os dois fundos dentro do cva**, por `data-[on-media=true]` (branco sobre a foto do hero) — `plan.md` §1.5 sugere a classe de fundo vindo da seção, e isso seria classe de cor fora do `ui/button.tsx`, proibida pelo `AGENTS.md` §4. Continuam três ênfases; a seção escolhe via prop `onMedia`, não estiliza.
5. `config.ts` guarda os três preços (`oneRoom`, `wholeHouse`, `moving`); o hero e os pacotes leem a mesma chave.
6. `page.tsx` fica como está — é da slice-1.

## Arquivos

`package.json` · `src/app/layout.tsx` · `src/app/globals.css` (+ apagar `globals.css.example`) · `src/config.ts` · `src/components/ui/button.tsx` · `src/components/WhatsappButton.tsx`

## Critérios de aceite

- `pnpm typecheck`, `pnpm lint`, `pnpm build` passam; `/` sai como `○`
- `grep -rln buttonVariants src/` → exatamente 2 arquivos
- `grep -rn "\[" src/config.ts` → 0 placeholders; `origin` → 0 ocorrências
- `find src -name "*.example"` → 0
- `components.json` sem `accordion`; `ls src/components/ui` → só `button.tsx`
- Uma 4ª ênfase (`waGhost`) faz o `tsc` sair com erro
- `.section-container`: `max-width` 1040px; padding lateral 22px em viewport de 360px e 56px em 1440px
- `--border-warm` = `oklch(0.925 0.018 92)` existe em `:root`
- CTA renderizado: altura **52px** em 390px de largura; `border-radius` 999px; `font-size` 15px
- `getComputedStyle` do `<body>`: `Karla`; de um elemento `font-display`: `Prata` — nenhum dos dois em fallback
- Glifo `Ô` do wordmark renderiza em Prata (não cai no serif do sistema)
- `buildWhatsappLink("hero")` = `https://wa.me/5516992375781?text=Oi!%20Vim%20pela%20p%C3%A1gina%20da%20C%C3%94MODA%20e%20quero%20organizar%20minha%20casa.`

## Como testar à mão

`pnpm dev`, e numa página temporária (`src/app/_check/page.tsx`, **apagada antes do commit**): wordmark em `font-display`, um `WhatsappButton` de cada ênfase. No DevTools em 390px: medir altura do botão, ler as fontes computadas, rodar o `buildWhatsappLink` no console. Confirmar que o `_check` sumiu no `git diff`.
