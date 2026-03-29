  import { notFound } from 'next/navigation';
  import { PageHeader } from '@/components/sections/about/PageHeader';
  import { ServiceDetailBody } from '@/components/sections/services/ServiceDetailBody';
  import { getServiceBySlugAPI } from '@/services/serviceApi';


export default async function ServiceDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const resolvedParams = await params;
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