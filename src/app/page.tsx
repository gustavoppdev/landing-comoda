import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Problem } from "@/components/sections/Problem";
import { Method } from "@/components/sections/Method";
import { Proof } from "@/components/sections/Proof";
import { Packages } from "@/components/sections/Packages";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";

/**
 * Esqueleto da página — a ordem de spec.md §3, sem estilo.
 *
 * Não há `<header>`: o wordmark do hero é texto dentro da `<section>`, não
 * navegação (AGENTS.md §3.3). O `<main>` não tem padding nem gap: o fundo de
 * cada seção é full-bleed (plan.md §2) e o espaçamento vertical é de cada uma
 * delas. As seções ainda cruas ficam encostadas até a slice que as pega.
 */
export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Manifesto />
        <Problem />
        <Method />
        <Proof />
        <Packages />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
