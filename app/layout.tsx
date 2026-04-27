import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NextPlatform — Transformando Ideias em Realidade",
  description:
    "Metodologia Kanban Maturity Model. Product Discovery, Squad Digital, Success Way. Software entregue em 1 a 2 semanas com qualidade e previsibilidade.",
  keywords:
    "next platform, kanban maturity model, product discovery, software, agile, devops, squads, digital",
  openGraph: {
    title: "NextPlatform — Transformando Ideias em Realidade",
    description:
      "Metodologia KMM para transformar sua empresa. Software entregue em 1-2 semanas.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
