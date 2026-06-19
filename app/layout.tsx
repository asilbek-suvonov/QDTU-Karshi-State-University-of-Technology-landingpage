import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google"; // 1. Fontni import qilamiz
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/store/auth.store";
import Footer from "@/components/footer";

// 2. Font parametrlarini sozlaymiz
const sourceSans = Source_Sans_3({
  subsets: ["latin", "cyrillic-ext"], // O'zbek tili uchun kirill/lotin variantlari
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "QDTU — Qo'qon Davlat Texnika Universiteti",
  description: "Ilm-fan, innovatsiya va texnika sohasida yetakchi kadrlar tayyorlaydigan oliy ta'lim muassasasi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      {/* 3. <head> ichidagi eski linklarni butunlay olib tashlaymiz */}
      <head />
      {/* 4. Font klassini body'ga qo'shib qo'yamiz */}
      <body className={`${sourceSans.className} min-h-full flex flex-col antialiased`}>
        <QueryProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}