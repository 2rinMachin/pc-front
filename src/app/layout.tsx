import Footer from '@/components/Footer';
import Header from '@/components/Header';
import PageContent from '@/components/PageContent';
import { sharpSans } from '@/fonts';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pizza Hut',
};

export interface Props {
  children: ReactNode;
}

const RootLayout = ({ children }: Props) => (
  <html lang="es" className="flex min-h-full flex-col">
    <body
      className={twJoin(sharpSans.className, 'flex grow flex-col antialiased')}
    >
      <Header />
      <PageContent>{children}</PageContent>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
