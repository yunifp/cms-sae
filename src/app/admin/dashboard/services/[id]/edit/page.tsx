// src/app/admin/dashboard/services/[id]/edit/page.tsx

/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServicesAPI } from "@/services/serviceApi";
import EditServiceClient from "./EditServiceClient";

// Fungsi wajib untuk Static Site Generation (SSG) pada dynamic route
export async function generateStaticParams() {
  const services = await getServicesAPI();

  if (!services || services.length === 0) return [];
  
  return services.map((service: any) => ({
    // Mengamankan fallback: jika api mereturn id pakai id, jika slug pakai slug. 
    // Diubah menjadi string sesuai format params di Next.js.
    id: service.id ? service.id.toString() : service.slug.toString(), 
  }));
}

// Komponen Server yang merender Client Component
export default function EditServicePage() {
  return <EditServiceClient />;
}