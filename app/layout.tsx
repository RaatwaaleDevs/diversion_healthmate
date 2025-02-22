"use client";

import './globals.css';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { MainFooter } from '@/components/footer';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

const metadata = {
  title: 'HealthTech AI - Transforming Healthcare with AI & Innovation',
  description: 'AI-powered health technology platform for personalized healthcare and heart analysis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        {!isDashboard && <MainFooter />}
      </body>
    </html>
  );
}