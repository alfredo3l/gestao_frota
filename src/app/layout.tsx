import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UsuarioProvider } from '@/contexts/UsuarioContext';
import { TemaProvider } from '@/contexts/TemaContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Secretaria de Estado da Casa Civil',
  description: 'Plataforma completa para gestão de campanhas políticas, apoiadores, demandas e eventos.',
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
