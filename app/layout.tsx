import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Star Family — Студія творчого розвитку",
  description:
    "Місце потенціалу, професійної творчості та справжньої зіркової кар'єри. Студія творчого розвитку в Києві та Вінниці.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-bg font-body antialiased">
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
