import type { Metadata } from "next";
import { Karla, Prata } from "next/font/google";
import "./globals.css";

// Karla é variável (200–800): carregar sem `weight` traz os pesos 300, 400 e
// 500 de plan.md §1.3 num arquivo só. `--font-sans` é o nome que o `@theme
// inline` do preset consome — o `--font-geist-sans` do create-next-app não era.
const karla = Karla({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Prata tem um peso só (plan.md §4) e não publica `latin-ext` — o typecheck
// recusa. O `Ô` do wordmark (U+00D4) está no próprio subset `latin`, que é o
// que a verificação de glifo do tasks.md pede para confirmar em tela.
const prata = Prata({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// plan.md §3 — title 48 caracteres, description 133.
export const metadata: Metadata = {
  title: "CÔMODA · Organização residencial em São Paulo",
  description:
    "Organização de casas na zona oeste de SP, com o mapa de onde cada coisa mora e revisão inclusa 30 dias depois. A partir de R$ 890.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${karla.variable} ${prata.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
