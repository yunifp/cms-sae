import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/shared/ClientLayoutWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Studio SaeBoemi - Home Builder Contractor',
  description: 'Best Quality Home Builder Contractor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#121418] text-white`}>
        
        {/* Gunakan ClientLayoutWrapper di sini */}
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
        
      </body>
    </html>
  );
}