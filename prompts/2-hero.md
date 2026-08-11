# 2 · hero

## Decisões assumidas

1. **`main` perde `gap-8 p-6`.** O padding do esqueleto impede o full-bleed do hero. Sai agora; cada slice de conteúdo traz o próprio espaçamento. As seções ainda cruas passam a se encostar — cosmético, e some slice a slice.
2. **Gradiente e padding vertical do hero viram utilities no `globals.css`** (`.hero-scrim`, `.hero-shell`), ao lado da `.section-container`. Motivo: `bg-[linear-gradient(...)]` no JSX quebra o grep da slice-11, e o valor do gradiente já é registrado no `plan.md` §2 — o lugar dele é o bloco de tokens.
3. **Altura:** `min-h-[max(88svh,640px)]`. O hi-fi declara `min-height` duas vezes e a segunda vence (só 640px); `max()` é o que entrega as duas leituras do `tasks.md`.
4. **Branco do texto vem de token**, não de `#fff`: `text-background`, `/85` na subheadline e `/75` na faixa de preço — a mesma escala de opacidade do hi-fi.
5. **Faixa de preço lê `clientConfig.prices.oneRoom`** e recebe `· Um ambiente` + `uppercase` no JSX. O `config.ts` guarda o valor, não a versão versal.
6. **`onMedia` no CTA** — o fundo branco do `waSolid` sobre foto já está no cva desde a slice-0; aqui é só a escolha.

## Arquivos

`src/components/sections/Hero.tsx` (reescrito) · `src/app/globals.css` (duas utilities) · `src/app/page.tsx` (uma linha) · `specs/tasks.md`.

## Critérios de aceite

- Contraste medido sobre a IMG-01 **depois** do gradiente, no pixel mais claro de cada faixa de texto: H1 ≥ 4,5:1 · subheadline ≥ 4,5:1 · faixa de preço ≥ 4,5:1. Medição por script sobre o WebP real, não a olho — reporto os três números
- Gradiente exatamente `linear-gradient(to top, rgba(24,26,29,.74), rgba(24,26,29,.28) 46%, transparent)`, altura 62% da seção
- Altura da seção ≥ 640px em 390×844; altura renderizada do CTA = 52px
- `<h1>` = 62px em ≥768px, 36px em 390px — maior que qualquer outro texto da página
- Faixa de preço 11px/Karla 400 contra subheadline 15px/Karla 300 (peso menor, `spec.md` §1 exceção 2)
- `grep -rn "priority" src/` → 1 ocorrência · `grep -rn "text-\[\|bg-\[" src/components/` → 0
- `<nav>` = 0 · `<a>` no hero = 1 (o CTA) — o wordmark é `<div>`
- `pnpm typecheck` · `pnpm lint` · `pnpm build` com `/` em `○`

## Como testar à mão

390px: wordmark no topo centrado, foto ocupando a tela, bloco de texto colado na base sem estourar. Tab: um único stop, com anel de foco visível sobre a foto. Clicar abre `wa.me` com a mensagem `hero` já escrita.
