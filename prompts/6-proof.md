# slice-6-proof — 04 Prova

## Decisões assumidas

1. **A faixa da IMG-04 é irmã do bloco de números, dentro da mesma `<section>`**: `<section>` em `flex flex-col`, primeiro a faixa full-bleed (sem container), depois o bloco com `.section-container`. É o único jeito de a imagem ir de borda a borda sem quebrar o ritmo de fundo do `plan.md` §2.
2. **Altura da faixa por `h-[clamp(240px,42vw,460px)]` no JSX**, não utility nova no `globals.css`: é medida de uma seção só, e a regra de valor solto do `AGENTS.md` §4 é sobre cor e tipografia (`text-[`, `bg-[`), não sobre altura — mesma prática de `gap-[clamp(...)]` das slices 3–5.
3. **Padding vertical assimétrico**, `pt-[clamp(40px,6vw,72px)] pb-[clamp(72px,10vw,124px)]`, e não `.section-block`: a faixa já dá o respiro do topo. O teto de baixo é o 124px do `plan.md` §1.2 contra 120px do hi-fi — mesma divergência de 4px registrada na slice-4.
4. **Rótulo do número em `text-body text-muted-foreground`** (14px fixo, #6B6B63). O hi-fi usa #8A8A80, que não é token; o `text-body` sem par `-lg` mantém os 14px do hi-fi em desktop.
5. **Os três números viram `<ul>`/`<li>` com `list-none`**, não `<div>` como no hi-fi: são três itens equivalentes, sem ordem. Sem `<h2>` e sem rótulo de seção — a ausência é da `spec.md` §5.
6. **IMG-04 por `fill` + `sizes="100vw"` dentro do wrapper de altura**, como na slice-3: o arquivo é maior que o slot e o `object-cover` recorta. Alt exato do `plan.md` §1.6. **Sem `priority`.**

## Arquivos a alterar

- `src/components/sections/Proof.tsx` — único arquivo. Server Component, sem CTA.

## Critérios de aceite (número)

- `grep -cE "text-\[|bg-\[" src/components/sections/Proof.tsx` → **0**
- `<a>` na seção = **0** · `<button>` = **0** · `<h2>` = **0** · texto sobre a faixa = **0** (nenhum filho posicionado dentro do wrapper da imagem)
- Faixa: altura renderizada **240px** a 390px e **460px** a 1280px; `object-fit` = `cover`; a `<img>` da IMG-04 **não** tem `fetchpriority="high"` e não aparece em `<link rel="preload">` no HTML servido — só a IMG-01
- Números: `font-size` computado **38px** a 390px e **58px** a 1280px, família **Prata** — e **menor** que o H1 do hero (62px a 1280px), conferido lado a lado
- Rótulos: **14px** nas duas larguras, contraste ≥ **4,5:1** sobre branco
- Grid: **1 coluna** a 390px e **3 colunas** a 1280px, sem media query; `gap` **28px** / **48px**
- Textos exatos: "140 · casas organizadas desde 2019", "6 · anos dedicados só a isso", "30 · dias de revisão inclusa" — **nenhum nome próprio** na seção (`grep -cE "Renata|Juliana|Fernanda|Marina" ` → 0)

## Como testar à mão

1. `pnpm dev`, `/` no iframe de 390×844 e 1280px (o `resize_window` não pega neste WM — método das slices 2–5).
2. `getComputedStyle` nos alvos; contraste por canvas resolvendo `lab()` antes, como na slice-4.
3. `pnpm typecheck && pnpm lint && pnpm build` (rota `/` estática ○) e ler o `git diff`.
