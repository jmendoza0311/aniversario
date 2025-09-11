import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";
// import Header from "@/components/layout/Header";
import { AudioProvider } from "@/contexts/AudioContext";
import MiniPlayer from "@/components/MiniPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "7 Años Juntos",
  description: "Celebrando nuestros 7 años de amor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScript.variable} antialiased`}
      >
        <AudioProvider>
          <main className="min-h-screen">
            {children}
          </main>
          
          {/* Mini reproductor global */}
          <MiniPlayer />
        </AudioProvider>
      </body>
        </html>
  );
}
