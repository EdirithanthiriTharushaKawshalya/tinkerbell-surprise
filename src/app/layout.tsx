// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Great_Vibes } from 'next/font/google';
import './globals.css';
// 1. Import the new component
import MagicFlowBackground from '@/components/MagicalBackground';

const inter = Inter({ subsets: ['latin'] });

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-handwriting',
});

export const metadata: Metadata = {
  title: 'Tinkerbell',
  description: 'A special surprise...',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MagicFlowBackground /> 
        
        {children}
      </body>
    </html>
  );
}