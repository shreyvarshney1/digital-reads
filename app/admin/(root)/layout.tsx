import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { userId } = auth();

  // if (!userId) {
  //   redirect('/sign-in');
  // }

  // const store = await prisma.store.findFirst({
  //   where: {
  //     userId: userId,
  //   },
  // });

  // if (store) {
  //   redirect(`/${store.id}`);
  // }

  return <>{children}</>;
}
