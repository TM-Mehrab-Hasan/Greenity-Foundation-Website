import type { Metadata } from "next";
import { Geist, Geist_Mono, Hind_Siliguri } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { getDictionary } from "@/dictionaries/get-dictionary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-hind-siliguri",
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Greenity Foundation Bangladesh",
  description: "Ensuring a greener and more sustainable Bangladesh through community-led environmental action.",
  icons: {
    icon: "/logo.jpg",
    apple: "/logo.jpg",
  },
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'bn' }];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as 'en' | 'bn');

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (theme === 'dark') document.documentElement.classList.add('dark');
                  else document.documentElement.classList.remove('dark');
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${hindSiliguri.variable} antialiased`} suppressHydrationWarning>
        <Navbar lang={lang} dictionary={dictionary} />
        {children}
      </body>
    </html>
  );
}
