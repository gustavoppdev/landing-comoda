/**
 * Política de privacidade — rota legal, não navegação (AGENTS.md §3.3).
 *
 * Existe porque a página prevê medição por analytics (plan.md §3) e o critério
 * de spec.md §4 não aceita o link do rodapé apontando para `#`. É a única outra
 * rota do projeto: sem CTA, sem imagem, sem barra fixa — quem chega aqui veio
 * ler, não converter.
 *
 * Segmento em português por ser URL exibida ao usuário; o resto do código
 * segue em inglês (AGENTS.md §4).
 *
 * Pré-renderizada: nenhuma API dinâmica.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidade · CÔMODA",
  description:
    "Como esta página trata dados de navegação: nenhum formulário, medição agregada e contato apenas por WhatsApp.",
};

/** Data da última revisão deste texto — exibida no fim da página. */
const LAST_UPDATED = "11 de agosto de 2026";

export default function PrivacyPolicy() {
  return (
    <main className="section-block">
      <div className="section-container">
        <div className="flex max-w-[680px] flex-col gap-[clamp(28px,4vw,40px)]">
          <div className="flex flex-col gap-[14px]">
            <p className="text-label text-muted-foreground uppercase">
              Política de privacidade
            </p>

            <h1 className="text-h2 md:text-h2-lg font-display text-pretty">
              O que esta página faz com os seus dados.
            </h1>
          </div>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display">Projeto fictício</h2>
            <p className="text-body md:text-body-lg">
              A CÔMODA é um negócio fictício, criado para portfólio. Nenhum
              serviço é comercializado nesta página e nenhuma contratação é
              possível por ela.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display">
              Dados que a página coleta de você
            </h2>
            <p className="text-body md:text-body-lg">
              Nenhum. Não há formulário, cadastro nem área de login: a página é
              texto, imagem e um botão. Você nunca digita nada aqui.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display">
              Ao clicar no botão de WhatsApp
            </h2>
            <p className="text-body md:text-body-lg">
              O botão abre o WhatsApp com uma mensagem já escrita, que você pode
              editar ou apagar antes de enviar. A partir daí a conversa acontece
              dentro do WhatsApp e passa a ser regida pela política de
              privacidade da Meta — esta página não guarda cópia do que é
              conversado ali.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display">Medição de audiência</h2>
            <p className="text-body md:text-body-lg">
              A página pode usar cookies e identificadores de medição do Google
              Analytics 4 e do Meta Pixel para saber, em números agregados,
              quantas pessoas visitam, de qual campanha vieram e quantas clicam
              no botão. O uso é estatístico: não há perfil individual montado
              aqui, não há venda de dados e não há publicidade servida por esta
              página. Você pode bloquear esses cookies nas configurações do seu
              navegador sem perder nada do conteúdo.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="text-h3 font-display">Seus direitos</h2>
            <p className="text-body md:text-body-lg">
              Pela Lei Geral de Proteção de Dados (Lei 13.709/2018), você pode
              pedir acesso, correção ou exclusão de qualquer dado seu. Como esta
              página não coleta dado de identificação, o pedido cabível é sobre
              o que você tenha enviado por WhatsApp — e pode ser feito pelo
              mesmo WhatsApp da página.
            </p>
          </section>

          <div className="flex flex-col gap-4">
            <p className="text-body text-muted-foreground">
              Atualizada em {LAST_UPDATED}.
            </p>

            <Link
              href="/"
              className="text-body focus-visible:outline-foreground w-fit rounded-xs underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              Voltar para a página da CÔMODA
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
