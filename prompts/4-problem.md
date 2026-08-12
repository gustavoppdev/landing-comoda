# slice-4-problem — 02 Problema

## Decisões assumidas

1. **Rótulo em `--muted-foreground`** (#6B6B63, 5.67:1 sobre creme), não o #A8A294 do hi-fi — não é token registrado e reprova AA sobre creme. Mesma decisão da slice-3, já no diário.
2. **Corpo das três frases em `text-lead md:text-lead-lg`** (15→17px, line-height 1.6). O hi-fi usa 1.7; o token do `plan.md` §1.3 é 1.6 e vence. Divergência de 0.1 registrada no diário.
3. **Fundo creme por `bg-card`** na `<section>`, full-bleed; `.section-container` interno (1040px) — é a primeira faixa creme da página e o ritmo de `plan.md` §2 já a previa.
4. **Padding vertical pela `.section-block`** (`clamp(72px,10vw,124px)`), que nasceu na slice-3 sem consumidor — este é o primeiro. O hi-fi tem teto 120px; o teto do plano é 124px.
5. **Bloco de título limitado a 560px**, como no hi-fi, dentro do container de 1040px. Não é container novo: é `max-w-[560px]` no bloco, medida estrutural única desta seção.
6. Nenhuma utility nova no `globals.css` nesta slice.

## Arquivos a alterar

- `src/components/sections/Problem.tsx` — único arquivo. Server Component, sem import de imagem, sem `WhatsappButton`.

## Critérios de aceite (número)

- `<img>` dentro da seção = **0** · `<a>` = **0** · `<button>` = **0**
- `grep -cE "ansiedade|TDAH|acumulação|transtorno|cura|terapia|saúde mental" src/components/sections/Problem.tsx` → **0**
- `grep -cE "text-\[|bg-\[" src/components/sections/Problem.tsx` → **0**
- Grid: `grid-template-columns` computado com **3 colunas** a 1280px e **1 coluna** a 390px, sem media query (`auto-fit`/`minmax(240px,1fr)`)
- Gap horizontal entre as três frases: **48px** a 1280px (`clamp(26px,4vw,48px)`)
- As três frases: `border-width` = **0px**, `background-color` = `rgba(0,0,0,0)`, `list-style` inexistente (são `<p>`), nenhum pseudo-elemento `::before` com conteúdo
- Fundo computado da `<section>`: **#FBF7EC** (`--card`)
- Rótulo "O PROBLEMA": `letter-spacing` **0.24em** computado, cor **#6B6B63**, contraste sobre #FBF7EC ≥ **4,5:1**
- H2 computado: **38px** a 1280px, **26px** a 390px, família Prata
- Texto das três frases: **17px** a 1280px, **15px** a 390px, contraste ≥ **4,5:1** sobre creme

## Como testar à mão

1. `pnpm dev`, abrir `/` no iframe de 390×844 (o `resize_window` não pega neste WM — mesmo método das slices 2 e 3) e a 1280px.
2. `getComputedStyle` nos alvos acima; contraste por canvas sobre o creme sólido (sem imagem, o cálculo é direto).
3. `pnpm typecheck && pnpm lint && pnpm build` (rota `/` estática ○) e ler o `git diff`.
