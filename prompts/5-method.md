# slice-5-method — 03 Método

## Decisões assumidas

1. **Números 01–04 em `text-label text-muted-foreground`** (11px / 0.24em / #6B6B63). O hi-fi usa Karla 12px / 0.1em em #B3B0A6 — cor fora dos tokens e ~2,1:1 sobre branco, reprova AA. Mesma decisão das slices 3 e 4; divergência de tamanho e tracking para o diário.
2. **As quatro linhas viram `<ol>` / `<li>` com `list-none`**, não `<div>` como no hi-fi: a ordem das etapas é o conteúdo. Nenhum marcador nativo aparece — os números são texto na coluna de 44px.
3. **Bordas em `--border`** (`border-t` em cada linha, `last:border-b`), não `--border-warm`: a seção é branca, e a warm é das faixas creme (`plan.md` §2).
4. **Corpo do apoio em `text-body md:text-body-lg`** (14→16px), h3 em `text-h3 md:text-h3-lg` — os tokens do `plan.md` §1.3 batem com o hi-fi aqui.
5. **CTA `waOutline`, `self-start`**, mensagem `method`, `aria-label` "Falar no WhatsApp sobre o passo a passo do serviço" — a única ocorrência desta ênfase na página.
6. Nenhuma utility nova no `globals.css`; `.section-block` e `.section-container` já existem.

## Arquivos a alterar

- `src/components/sections/Method.tsx` — único arquivo. Server Component; o `WhatsappButton` já é client por conta própria.

## Critérios de aceite (número)

- `grep -cE "text-\[|bg-\[" src/components/sections/Method.tsx` → **0**
- `<img>` na seção = **0** · `<a>` = **1** (só o CTA) · `<button>` = **0**
- Coluna dos números: `grid-template-columns` computado **44px** + resto, nas duas larguras
- Quatro `<li>`: `border-top-width` = **1px** nos quatro, `border-bottom-width` = **1px** só no último, **0px** nos três primeiros; cor **#ECEAE4**
- `list-style-type` = **none** e `::marker` sem conteúdo nos quatro `<li>`
- `cursor` computado = **auto** em `<li>`, `<h3>` e `<p>`; nenhuma regra `:hover` altera `background-color` ou cor deles (conferir por `getComputedStyle` antes e depois de `dispatchEvent(mouseover)`)
- Texto do passo 04 = "Revisão em 30 dias" e o apoio contém "Já está no valor do pacote."
- CTA: altura renderizada **52px** a 390px, `border-width` **1px**, `background-color` transparente, `href` = `wa.me/5516992375781?text=` com a mensagem `method` encodada
- H3 computado: **24px** a 1280px, **19px** a 390px, família Prata · apoio **16px** / **14px**, contraste ≥ **4,5:1** sobre branco
- Rótulo "COMO FUNCIONA": `letter-spacing` **0.24em**, contraste ≥ **4,5:1**

## Como testar à mão

1. `pnpm dev`, `/` no iframe de 390×844 e a 1280px (o `resize_window` não pega neste WM — método das slices 2–4).
2. `getComputedStyle` nos alvos; contraste por canvas (resolver `lab()` antes de calcular, como na slice-4).
3. `pnpm typecheck && pnpm lint && pnpm build` (rota `/` estática ○) e ler o `git diff`.
