import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import PrivateRoute from '@/components/private-route';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Inventory',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        {/* <PrivateRoute> */}
        <main className="flex-1 overflow-auto pt-16">{children}</main>
        {/* </PrivateRoute> */}
      </div>
    </>
  );
}
