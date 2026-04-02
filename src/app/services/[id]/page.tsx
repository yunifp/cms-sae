// src/app/services/[id]/page.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/sections/about/PageHeader';
import { ServiceDetailBody } from '@/components/sections/services/ServiceDetailBody';
// 1. Tambahkan getServicesAPI pada baris import
import { getServiceBySlugAPI, getServicesAPI } from '@/services/serviceApi';

// 2. Tambahkan generateStaticParams untuk SSG
export async function generateStaticParams() {
  // Ambil semua daftar services dari API
  const services = await getServicesAPI();

  if (!services || services.length === 0) return [];
  
  // Karena route menggunakan [id] tapi dipanggil sebagai slug di getServiceBySlugAPI,
  // kita petakan nilai 'slug' dari data service ke parameter 'id'
  return services.map((service: any) => ({
    id: service.slug.toString(), // Jika field di database bernama slug
    // id: service.id.toString(), // <-- Gunakan ini JIKA ternyata API aslinya menggunakan ID angka
  }));
}

export default async function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
  
  // resolvedParams.id di sini akan berisi nilai string dari hasil generateStaticParams di atas
  const service = await getServiceBySlugAPI(resolvedParams.id);

  if (!service) {
    notFound();
  }

  return (
    <main className="flex flex-col min-h-screen">
      <PageHeader 
        title={service.name} 
        bgImage={service.imageUrl} 
        breadcrumbs={[
          { name: 'Beranda', href: '/' },
          { name: 'Layanan', href: '/services' },
          { name: service.name, href: '#' }
        ]} 
      />
      <ServiceDetailBody service={service} />
    </main>
  );
}