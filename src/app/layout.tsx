import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UsuarioProvider } from '@/contexts/UsuarioContext';
import { TemaProvider } from '@/contexts/TemaContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Plataforma de Gestão de Frota',
  description: 'Plataforma de Gestão de Frota.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <UsuarioProvider>
          <TemaProvider>
            {children}
          </TemaProvider>
        </UsuarioProvider>
      </body>
    </html>
  );
}
