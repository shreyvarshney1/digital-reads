import React from 'react';
import { redirect } from 'next/navigation';

import prisma from '@/lib/prisma';

import { SettingsForm } from './components/settings-form';
import { auth, signIn } from '@/auth';

interface SettingPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingPageProps> = async ({ params }) => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    signIn("google");
  }

  const store = await prisma.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default SettingsPage;
