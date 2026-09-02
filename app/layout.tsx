import type { Metadata } from "next";
import { Afacad_Flux, Cormorant_Garamond } from "next/font/google";
// import { Roboto } from "next/font/google";
// import { Lora } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PageFade } from "@/components/page-fade";

const lora = Afacad_Flux({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// Used only by the opening scene, which keeps its own ink-on-paper typography.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Julien Liang",
  description: "Personal portfolio",
  icons: {
    icon: "/JL_logo_custom.ico",
    shortcut: "/JL_logo_custom.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          Apply the saved theme before first paint. Without this the page
          renders light, then the provider's effect flips it, so anyone who
          chose dark sees a flash of the light theme on every navigation.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('theme-v2')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
      </head>
      <body className={`${lora.variable} ${cormorant.variable} antialiased`}>
        <ThemeProvider>
          <PageFade />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
