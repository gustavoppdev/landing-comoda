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
 * navegação (AGENTS.md §3.3). O espaçamento abaixo existe só para as seções não
 * colarem umas nas outras; cada slice de conteúdo traz o seu.
 */
export default function Home() {
  return (
    <>
      <main className="flex flex-col gap-8 p-6">
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
