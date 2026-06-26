import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import Script from "next/script";
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      name: "Star Family",
      description: "Студія творчого розвитку для дітей",
      url: "https://www.starfamily.in.ua",
      logo: "https://www.starfamily.in.ua/logo.png",
      sameAs: ["https://www.instagram.com/starfamilyua/"],
      location: [
        {
          "@type": "Place",
          name: "Star Family Київ",
          address: {
            "@type": "PostalAddress",
            streetAddress: "вул. Анни Ахматової 44а",
            addressLocality: "Київ",
            addressCountry: "UA",
          },
        },
        {
          "@type": "Place",
          name: "Star Family Вінниця",
          address: {
            "@type": "PostalAddress",
            streetAddress: "просп. Космонавтів 53",
            addressLocality: "Вінниця",
            addressCountry: "UA",
          },
        },
      ],
    },
  ],
};

export const metadata: Metadata = {
  title: "Star Family — Студія творчого розвитку | Київ та Вінниця",
  description:
    "Star Family — дитяча студія творчого розвитку в Києві та Вінниці. Хореографія, вокал, акторська майстерність, повітряна гімнастика, англійська. Запис на заняття.",
  keywords:
    "Star Family, студія творчого розвитку, дитяча студія Київ, дитяча студія Вінниця, танці для дітей Київ, танці для дітей Вінниця, гуртки для дітей Київ, гуртки для дітей Вінниця, хореографія для дітей Київ, хореографія для дітей Вінниця, вокал для дітей Київ, вокал для дітей Вінниця, повітряна гімнастика для дітей, акторська майстерність для дітей, творчі гуртки для дітей, студія творчого розвитку для дітей Київ, студія творчого розвитку для дітей Вінниця, де записати дитину на танці Вінниця, де записати дитину на танці Київ, гуртки для дітей від 3 років Київ, гуртки для дітей від 3 років Вінниця, Star Family Київ, Star Family Вінниця",
  metadataBase: new URL("https://www.starfamily.in.ua"),
  alternates: {
    canonical: "https://www.starfamily.in.ua",
  },
  openGraph: {
    title: "Star Family — Студія творчого розвитку",
    description:
      "Хореографія, вокал, акторська майстерність, повітряна гімнастика у Києві та Вінниці",
    url: "https://www.starfamily.in.ua",
    siteName: "Star Family",
    locale: "uk_UA",
    type: "website",
    images: [
      {
        url: "/hero-bg.jpg",
        width: 1200,
        height: 630,
        alt: "Star Family — Студія творчого розвитку",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${playfair.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-bg font-body antialiased">
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-0FTQXRSCNW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0FTQXRSCNW');
          `}
        </Script>
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
