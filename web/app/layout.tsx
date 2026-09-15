import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SERMAPOR — Servicios Marítimos y Portuarios',
  description: 'Empresa especializada en estiba, desestiba, almacenamiento y servicios logísticos portuarios. Grupo B&M Agencia Marítima S.A. Desde 1997.',
  keywords: 'servicios marítimos, portuarios, estiba, desestiba, logística, almacenaje, Puerto Montt, Chile, SERMAPOR',
  openGraph: {
    title: 'SERMAPOR — Servicios Marítimos y Portuarios',
    description: 'Soluciones integrales para la operación portuaria desde 1997.',
    url: 'https://sermapor.cl',
    siteName: 'SERMAPOR',
    locale: 'es_CL',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
