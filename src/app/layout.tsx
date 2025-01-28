import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from "next";
import ClientLayout from '@/components/layout/ClientLayout';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "Evolução Vistoria",
  description: "Sistema de gestão de vistorias imobiliárias",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): React.JSX.Element {
  return (
    <html lang="pt-BR" className={`antialiased ${inter.variable}`}>
      <body className="font-sans" suppressHydrationWarning>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
