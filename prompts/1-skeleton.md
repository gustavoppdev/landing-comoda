# 1 · skeleton

## Decisões assumidas

1. **Uma seção = um arquivo em `src/components/sections/*.tsx`, já nesta slice.** Alternativa era tudo inline no `page.tsx` e extrair depois — cada slice de conteúdo faria um recorte diferente e o diff dela viraria "moveu + mudou". Criando agora, a slice-2 edita `Hero.tsx` e nada mais.
2. **Dez arquivos, PascalCase**: `Hero` · `Manifesto` · `Problem` · `Method` · `Proof` · `Packages` · `Testimonials` · `Faq` · `FinalCta` · `Footer`. Todos Server Components, nenhum `'use client'`, nenhum import do `WhatsappButton` ainda (CTA é de cada slice de conteúdo).
3. **Só os `<h2>` da `spec.md` §3, com o texto final** — nada de lorem. `Hero` leva o `<h1>`. Sem rótulo, sem corpo, sem imagem, sem estilo: nenhuma classe além do que `page.tsx` precisa para as seções não colarem umas nas outras.
4. **Duas seções ficam sem heading, não uma.** O `tasks.md` diz que a Prova é a única sem `<h2>`, mas o `COMODA.dc.html` (fonte de verdade visual, `spec.md` §5) tem seis `<h2>`: Depoimentos também não tem título, só o rótulo "O QUE DIZEM". Sigo o hi-fi — `Proof` e `Testimonials` saem desta slice como `<section id>` vazia, e a linha do `tasks.md` vai para o diário de fricção como imprecisão, não como erro de implementação.
5. **`Footer` renderiza `<footer>`**, fora do `<main>`. As nove primeiras são `<section>` dentro de `<main>`.
6. **`page.tsx` não recebe `metadata`** — já está no `layout.tsx` e a slice-12 é dona do resto.
7. **O deploy da Vercel já está no ar** (informado por você) — o item do checklist é marcado sem eu rodar deploy nenhum.

## Arquivos

`src/app/page.tsx` (reescrito — sai o template do create-next-app) · dez arquivos novos em `src/components/sections/` · `specs/tasks.md` (checkboxes e diário).

## Critérios de aceite

- `pnpm typecheck`, `pnpm lint`, `pnpm build` passam; `/` sai como `○`
- `ls src/components/sections | wc -l` → **10**
- No HTML servido: `<h1>` → **1** · `<h2>` → **6** (manifesto, problema, método, pacotes, FAQ, CTA final) — o mesmo número do `COMODA.dc.html`
- `<section>` → 9 · `<main>` → 1 · `<footer>` → 1 · `<header>` → **0** · `<nav>` → **0**
- `grep -rn "use client" src/components/sections/` → 0
- `grep -rn "buttonVariants\|WhatsappButton" src/components/sections/` → 0
- Ordem dos textos no HTML, de cima para baixo: hero → manifesto → problema → método → prova → pacotes → depoimentos → FAQ → CTA final → rodapé
- `grep -rn "next.svg\|vercel.svg\|Deploy Now" src/` → 0

## Como testar à mão

`pnpm dev` em 390px: a página é uma lista de títulos pretos sobre branco, feia e legível. `view-source` mostra os textos na ordem acima. Tab pela página inteira: **nenhum** elemento focável (não há link nem botão ainda).
