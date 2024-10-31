import prisma from '@/lib/prisma';

import { AuthorForm } from './components/author-form';

const AuthorPage = async ({
  params,
}: {
  params: { sizeId: string };
}) => {
  const size = await prisma.author.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <AuthorForm initialData={size} />
      </div>
    </div>
  );
};

export default AuthorPage;
