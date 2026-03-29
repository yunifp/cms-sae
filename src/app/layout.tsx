import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/shared/ClientLayoutWrapper';
import { getServicesAPI } from '@/services/serviceApi'; // Import API Layanan

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Studio SaeBoemi - Home Builder Contractor',
  description: 'Best Quality Home Builder Contractor',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Ambil data layanan secara server-side
  const services = await getServicesAPI();

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col bg-[#121418] text-white`}>
        
        {/* Kirim data services sebagai props ke wrapper */}
        <ClientLayoutWrapper services={services}>
          {children}
        </ClientLayoutWrapper>
        
      </body>
    </html>
  );
}