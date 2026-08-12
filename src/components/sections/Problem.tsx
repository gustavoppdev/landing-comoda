/**
 * 02 Problema — spec.md §3.
 *
 * Primeira faixa creme da página (ritmo de plan.md §2): o fundo é full-bleed
 * na `<section>` e só o conteúdo entra no container de 1040px.
 *
 * **Nenhuma imagem aqui**, por decisão do briefing §6 transposta para a
 * spec.md §3: o problema é dito em texto, na primeira pessoa da cliente,
 * nunca mostrado. É nesta seção que a tentação de mostrar bagunça existe.
 *
 * As três frases não têm caixa, borda, ícone nem marcador — o gap de 48px é
 * o único separador. Também **nenhum CTA**: o próximo é o do método.
 */
export function Problem() {
  return (
    <section id="problem" className="section-block bg-card text-card-foreground">
      <div className="section-container flex flex-col gap-[clamp(34px,5vw,56px)]">
        <div className="flex max-w-[560px] flex-col gap-[18px]">
          <p className="text-label text-muted-foreground uppercase">O problema</p>

          <h2 className="text-h2 md:text-h2-lg font-display">
            Não é falta de esforço. É falta de sistema.
          </h2>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-[clamp(26px,4vw,48px)]">
          <p className="text-lead md:text-lead-lg text-muted-foreground">
            Você já comprou caixas organizadoras que continuam vazias dentro do
            armário.
          </p>

          <p className="text-lead md:text-lead-lg text-muted-foreground">
            Arruma a cozinha no domingo e na quarta ela já não é a mesma.
          </p>

          <p className="text-lead md:text-lead-lg text-muted-foreground">
            Evita receber visita sem avisar — não pela casa, pelo que ela mostra
            de você.
          </p>
        </div>
      </div>
    </section>
  );
}
