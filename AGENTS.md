<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Landing Pages de Conversão para WhatsApp

Engenheiro front-end sênior implementando **páginas únicas focadas em um clique de WhatsApp**, em Next.js + Tailwind v4 + shadcn/ui (Base UI). Aqui ficam **todas as regras fixas**; os arquivos de `specs/` têm só o que varia por projeto.

---

## 1. Ciclo de cada slice

1. Ler `spec.md`, `plan.md`, `tasks.md` — nesta ordem. Inspecionar o código existente em `src/`.
2. Perguntar **só** se a ambiguidade afeta a conversão (mensagem não definida, preço visível ou não).
3. Escrever `prompts/<n>-<name>.md` — **máximo 450 palavras**, número pra conferir, não intenção. Não coube: proponha dividir a slice antes de escrever.
4. Pedir aprovação: "Prompt pronto em `prompts/<n>-<name>.md`. Posso executar?" Implementar só depois do sim.
5. Rodar os portões da §5 e reportar a saída exata de cada um.
6. Fechar: commit, deploy e registro no diário de fricção do `tasks.md`. O ritual completo (branch → prompt → implementação → portões → commit → deploy) está no topo do `tasks.md` e vale para toda slice.

Conteúdo do prompt, e só isto: decisões assumidas · arquivos a alterar · **critérios de aceite como número** (não instrução a cumprir) · como testar à mão. Não recapitule o que leu nem o que já existe no código — quem aprova já sabe.

Antes de pedir aprovação, releia o prompt contra as quatro camadas da §4 — a slice que as viola é a que parece mais simples.

---

## 2. Mapa de propriedade

**Um fato mora em um arquivo; os outros referenciam por seção, nunca recopiam.** Duas cópias são uma contradição esperando a próxima edição tocar só uma.

| Arquivo                   | Dono de                                                             | Ler                              |
| ------------------------- | ------------------------------------------------------------------- | -------------------------------- |
| `AGENTS.md` (este)        | regras fixas de produto, stack e código                             | toda sessão                      |
| `specs/spec.md`           | conteúdo, copy, compliance, aceite, meta de performance             | toda slice                       |
| `specs/plan.md`           | tokens, tipografia, dimensões, imagens (**inclusive alt**), técnico | toda slice                       |
| `specs/tasks.md`          | ritual, condições do projeto, checklist, diário de fricção          | toda slice                       |
| `specs/briefing.md`       | o que o cliente respondeu — já transposto para a spec               | só se a spec mandar              |
| `specs/design-reference/` | o design de referência (`.dc.html` e/ou imagem)                     | slices de design, ver `tasks.md` |
| `specs/images-prompts.md` | prompt de geração de cada imagem, por ID                            | slice que usa a imagem           |

Nunca invente conteúdo, cor, texto ou exigência de compliance fora desses arquivos. Se falta, pergunte.

---

## 3. Regras de produto (não negociáveis)

Cada regra traz o motivo — regra sem motivo é regra que se quebra sem saber o preço.

1. **Conversão única.** Um só objetivo: o clique no WhatsApp. Sem formulário, sem e-book, sem link de rede social no corpo — dois caminhos dividem a conversão.
2. **Botão idêntico em toda a página.** Mesmo texto, formato e ícone; só a **ênfase** varia, em função do fundo, e apenas as registradas em `plan.md` §1.5 — variação não registrada vira improviso.
3. **Sem navegação.** Scroll único, sem menu, sem aba, sem modal antes do CTA. Rota legal (política de privacidade) é compliance, não navegação: só no rodapé, peso visual baixo. Mini-nav por âncora é **exceção**, não regra liberada — passa pela §1 da `spec.md` com as restrições que mantêm a regra de pé.
4. **Mobile-first estrito.** Testar em 360-390px antes de qualquer outro tamanho. CTA visível ou a no máximo 1 scroll — o tráfego pago desse tipo de página é quase todo mobile.
5. **Mensagem pré-preenchida, uma por seção.** `https://wa.me/55XXXXXXXXXXX?text=<encodeURIComponent(msg)>` — nunca abre conversa vazia. É a mensagem que diz de qual seção veio o lead.
6. **Performance.** Piso: LCP < 2,5s e CLS < 0,1 em 4G — a `spec.md` §4 pode apertar, nunca afrouxar. Toda imagem de conteúdo via `next/image`, `priority` só no hero (ele é o LCP). Página pré-renderizada em build.
7. **Prova antes da promessa.** Toda alegação de resultado tem prova na mesma seção ou na imediatamente seguinte. Nunca resultado individual garantido em linguagem absoluta — faixa ou tendência.
8. **Credibilidade.** Registro profissional visível se a profissão tiver. Depoimento, foto e case exigem autorização antes do ar. Exigência específica do nicho vai em `spec.md` §2, não aqui — ela varia por área.
9. **Página enxuta.** Seção que não reduz objeção, não gera confiança e não empurra para o CTA é cortada.
10. **Acessibilidade.** Contraste AA em todo texto (inclusive apoio, rótulo pequeno e fundo escuro). `aria-label` em cada CTA descrevendo o contexto em linguagem humana, nunca a chave interna. Alt descritivo em toda imagem. Cada CTA é um único stop de Tab. Foco visível em todo elemento interativo — o `buttonVariants` do preset costuma trazer o anel de foco pronto (confira no seu); qualquer elemento fora dele (link avulso, item de FAQ) precisa do mesmo tratamento, nunca `outline: none` sem substituto.
11. **Rastreamento.** Todo clique dispara `whatsapp_click` com a seção de origem, e a UTM da URL de entrada é capturada — sem isso, campanha paga não se otimiza.

Exceção a qualquer regra acima se declara em `spec.md` §1 com **o quê · por quê · o que continua de pé apesar da exceção**. Nunca silenciosa.

---

## 4. Stack e código

**Documentação oficial vence memória de treinamento.** Consulte `node_modules/next/dist/docs/` antes de escrever código Next.

- **`pnpm`**, sempre.
- **Pré-renderização:** sem `cookies()`, sem Server Action, sem rota dinâmica. Nunca `output: 'export'` — desliga a otimização do `next/image`, que sustenta a meta de LCP. Se a hospedagem não otimizar imagem, `images: { unoptimized: true }` é decisão consciente registrada em `plan.md` §3.
- **Server Components por padrão.** `'use client'` só em `src/components/WhatsappButton.tsx` e no que o shadcn já gera assim em `src/components/ui/*` (o `accordion` do Base UI é client por natureza). Seção de conteúdo é Server Component, sempre.
- **shadcn é código seu — o botão se edita, não se remenda.** Cor, altura, raio e padding do CTA nascem **dentro** do `buttonVariants` de `ui/button.tsx`: as três ênfases de `plan.md` §1.5 entram como valores novos de `variant` (`waSolid`, `waOutline`, `waInverted`) e as medidas de `plan.md` §1.2 como um `size: cta`. **Nenhuma classe de cor, altura ou raio do CTA existe fora desse arquivo.** O `WhatsappButton.tsx` não estiliza — ele escolhe.
- **Por que dentro e não ao lado:** o cva escolhe **um** valor por chave, então o `bg-primary` do `variant` default e o `bg-transparent` da sua ênfase nunca chegam juntos ao `className`. Concatenar cor por fora é o que criava essa briga; o `cn()` a resolvia, mas só enquanto alguém lembrasse de usá-lo. Editar o preset elimina a classe de bug em vez de guardá-la com um comentário.
- **Preserve o que o preset já tem.** Você acrescenta valores ao `variant` e ao `size`; não renomeia nem apaga os existentes (`default | outline | secondary | ghost | destructive | link`), que outros componentes instalados consomem. E confira as alturas reais do **seu** preset antes de assumir as do exemplo.
- **Altura de toque é decisão registrada, não default.** As alturas do preset ficam abaixo do alvo mínimo de toque (44px) — é por isso que o `size: cta` existe. Altura renderizada abaixo de 44px em mobile é bug, não escolha de design.
- **Link com cara de botão:** `<a className={cn(buttonVariants({ variant, size: "cta" }), className)}>`. Nunca `<Button>`, `asChild`, `render` ou `<Link>` — o Base UI aplica `role="button"` e mata a semântica de link.
- **Tokens nomeados:** `bg-primary`, `text-h2`, `font-heading`. Valor solto (`bg-[#25D366]`, `text-[13px]`) só existe dentro do bloco de tokens do `globals.css`.
- **Conteúdo contido.** Só fundo decorativo atravessa a tela; texto e CTA seguem o container — em tela larga, CTA solto na ponta fica ilegível. Medidas em `plan.md` §1.2.
- **Nome de arquivo de componente em PascalCase**, batendo com o nome do export: `Hero.tsx` exporta `Hero`, `WhatsappButton.tsx` exporta `WhatsappButton`. Vale para tudo em `src/components/sections/*` e para os nossos componentes de raiz. **Exceção: `src/components/ui/*` fica como o shadcn gera** (`button.tsx`, `accordion.tsx`) — aquilo é código dele, e renomear quebra o `shadcn add` na próxima vez. A fronteira do diretório é a fronteira da convenção: se está em `ui/`, não é nosso.
- **TypeScript explícito**, sem `any`.
- **Idioma:** tudo em inglês exceto o conteúdo exibido na página — identificador, nome de variável, nome de slice (`slice-0-foundation`, não `slice-0-fundacao`), nome de arquivo em `prompts/<n>-<name>.md`, nome de componente e de branch. Exceção: chave que é contrato com a spec ou com o analytics fica **exatamente** como a spec a define, em qualquer idioma — as chaves de seção do WhatsApp viram metadado do evento que o cliente lê no GA4; renomear quebra o relatório.
- **Imagens ficam em `public/`**, servidas como estático e consumidas via `next/image` com import estático — nome de arquivo em inglês (`hero.webp`), ID (`IMG-01`) batendo com `plan.md` §1.6 e `specs/images-prompts.md`.
- **`src/config.ts` é a fonte única** de número, mensagens e texto de CTA. Nunca duplique em componente.
- **Chave de API** (GA4, Pixel) por variável de ambiente, nunca no código-fonte.

**Arquitetura em quatro camadas, mesmo num projeto simples:** config (`src/config.ts`) · tokens (`src/app/globals.css`) · conteúdo (`src/components/sections/*`) · CTA e tracking (`src/components/WhatsappButton.tsx`). Não espalhe lógica de link ou de evento fora da última.

---

## 5. Verificações

Ao fim de toda slice, nesta ordem:

```
pnpm typecheck        # tsc --noEmit
pnpm lint
pnpm build            # a rota / deve aparecer como estática (○)
git diff              # lido, não só rodado
```

**O `git diff` não é formalidade.** Os três comandos acima passam com o conteúdo corrompido — o diff é a única verificação que lê texto.

**Critério de aceite é número a atingir, nunca instrução a cumprir.** "Aplicar a paleta do plan" pode ser cumprido com a página reprovando contraste AA; "AA ≥ 4,5:1 no texto sobre a foto do hero" pega o erro.

Nas slices que envolvem imagem, layout ou deploy, some:

- Comparação lado a lado com `specs/design-reference/`, em mobile e desktop — divergência aceita é registrada em `tasks.md`; divergência não notada é dívida
- Lighthouse mobile — reportar LCP e CLS contra a meta de `spec.md` §4
- Link `wa.me` aberto em **celular real**, não emulador
- `pnpm approve-builds` se a instalação bloqueou build script (`sharp`, `unrs-resolver`)

**Nunca afirme que uma verificação passou sem executá-la.** Reporte a saída.

---

## 6. Escopo

Construa apenas: conteúdo da `spec.md`, estilo do `plan.md`, o botão de WhatsApp, analytics do clique, otimização de imagem.

Não adicione sem pedido explícito: backend, API routes, banco, autenticação, formulário com envio, múltiplas páginas, CMS, state management. Se o pedido implicar algo dessa lista, pare e pergunte — provavelmente deixou de ser página única.

---

## 7. Contra a catraca

Regra nova entra apontando **a fricção que a motivou e o que sai no lugar dela**. Correção sem evidência de dois projetos não entra — uma execução não é amostra. A evidência vive no diário de fricção do `tasks.md`: se em 2-3 projetos a mesma exceção se repete, é a regra que está errada, não o projeto.

**Cortar também é mudar.** Regra, item de checklist e bloco de template só saem com o mesmo ônus: por que sai, e o que passa a segurar aquilo. Enxugar sem isso já custou — a checagem de contradição do briefing e o ritual de git saíram silenciosamente entre duas versões deste sistema.

Na dúvida: mantenha simples · preserve as quatro camadas · pergunte de forma objetiva em vez de presumir · salve o prompt antes de codar.
