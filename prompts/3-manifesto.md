# 3 · manifesto

## Decisões assumidas

1. **Três utilities novas no `globals.css`**, ao lado da `.section-container`: `.section-block` (`padding-block: clamp(72px,10vw,124px)`, o padrão de `plan.md` §1.2), `.section-block-airy` (`clamp(76px,11vw,132px)`, a exceção do manifesto e dos depoimentos) e `.section-container-narrow` (idêntica à `.section-container`, com `max-width:880px`). Motivo: mesmo argumento da `.hero-shell` — medida registrada no plano mora no bloco de tokens, não em `py-[clamp(...)]` no JSX. As duas primeiras nascem juntas porque a segunda só se entende contra a primeira.
2. **Padding vertical do `plan.md` §1.2 (piso 76px), não o do hi-fi (72px).** O `plan.md` é o dono de dimensão (`AGENTS.md` §2); divergência de 4px no mobile, registrada no diário.
3. **Rótulo "O QUE MUDA" em `text-muted-foreground`** (#6B6B63), não no #9A9A90 do hi-fi — esse cinza não é token registrado no `plan.md` §2, e o registrado é mais escuro (melhora o AA). Divergência no diário.
4. **IMG-03 fechou na geração** (conferida: Marina dobrando peça diante do closet, mesma luz da IMG-02). A degradação para uma imagem só, prevista em `plan.md` §4, **não** é acionada.
5. **Imagens por `fill` dentro de um wrapper `aspect-[4/5]`**, com `sizes` — e não `width/height` do import estático: o import estático continua dando a proporção, e o `fill` evita o pedido de 1122px de largura para um slot de ~420px.

## Arquivos

`src/components/sections/Manifesto.tsx` (reescrito) · `src/app/globals.css` (três utilities) · `specs/tasks.md`.

## Critérios de aceite

- Container do bloco: `max-width` computado = 880px; conteúdo centralizado (`text-align: center`)
- H2 = 42px em ≥768px e 25px em 390px, `text-wrap: pretty`, `line-height` 1.28
- Grid de imagens: 2 colunas a 1024px, 1 coluna a 390px, **sem nenhuma media query** — `repeat(auto-fit,minmax(220px,1fr))`
- Cada imagem: proporção 4:5 exata e `border-radius` computado = 4px
- `grep -rn "priority" src/` → 1 ocorrência (só a IMG-01)
- `<a>` dentro da seção = 0 · `<button>` = 0
- Contraste do rótulo e do apoio (#6B6B63 sobre #FFFFFF) = 5,37:1 ≥ 4,5:1
- Texto da apresentação da Marina = as duas frases da `spec.md` §3, sem a palavra "certificada", "formada", "registro" ou "título"
- `grep -rn "text-\[\|bg-\[" src/components/` → 0
- `pnpm typecheck` · `pnpm lint` · `pnpm build` com `/` em `○`

## Como testar à mão

390px: rótulo, H2, duas imagens empilhadas e o parágrafo da Marina, tudo centrado, sem barra horizontal. 1280px: as duas imagens lado a lado, com o bloco visivelmente mais estreito que o hero. Tab: nenhum stop dentro da seção.
