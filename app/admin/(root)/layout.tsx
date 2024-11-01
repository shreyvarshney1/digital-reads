import { auth, signIn } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    signIn("google");
  }

  const store = await prisma.store.findFirst({
    where: {
      userId: userId,
    },
  });

  if (store) {
    redirect(`/admin/${store.id}`);
  }

  return <>{children}</>;
}
