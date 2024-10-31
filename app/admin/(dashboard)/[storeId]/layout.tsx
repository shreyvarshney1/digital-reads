import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';
import Navbar from '@/components/navbar';
export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      // userId: userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
