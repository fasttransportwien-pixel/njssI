import './globals.css';
import type { Metadata } from 'next';
import { TopBar } from '@/components/TopBar';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CookieBanner } from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'Fast Transport Wien E.U. – Premium Kurier & Express in Wien',
  description:
    'Schnell. Sicher. Zuverlässig. Ihr Premium-Partner für Express-Transporte in Wien und ganz Europa. Kurier, Blumen, Dokumente, Kühltransport, Firmenkunden.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className="bg-white">
        <div className="flex min-h-screen flex-col">
          <TopBar />
          <Header />
          <main id="main" className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}
