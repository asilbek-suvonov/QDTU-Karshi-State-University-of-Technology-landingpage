import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { QueryProvider } from "@/providers/query-provider";
import { AuthProvider } from "@/store/auth.store";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "QDTU — Qo'qon Davlat Texnika Universiteti",
  description: "Ilm-fan, innovatsiya va texnika sohasida yetakchi kadrlar tayyorlaydigan oliy ta'lim muassasasi.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
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
