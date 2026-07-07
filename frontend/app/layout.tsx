import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'StellarPay Pro - AI-Powered Payment Platform',
  description: 'Seamless XLM transactions, charitable donations, and advanced blockchain operations on Stellar',
  keywords: ['Stellar', 'Blockchain', 'Payment', 'Crypto', 'XLM', 'Soroban', 'Web3'],
  authors: [{ name: 'StellarPay Team' }],
  creator: 'StellarPay Team',
  publisher: 'StellarPay',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stellar-pay-pro.vercel.app',
    siteName: 'StellarPay Pro',
    title: 'StellarPay Pro - AI-Powered Payment Platform',
    description: 'Seamless XLM transactions on Stellar blockchain',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StellarPay Pro',
    description: 'AI-Powered Multi-Wallet Payment Platform',
  },
  viewport: 'width=device-width, initial-scale=1.0',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0ea5e9" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%230ea5e9'>₹</text></svg>" />
      </head>
      <body>
        <Providers>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}