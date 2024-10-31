import { format } from 'date-fns';
import prisma from '@/lib/prisma';

import { AuthorsClient } from './components/client';
import { AuthorColumn } from './components/columns';

const AuthorsPage = async ({ params }: { params: { storeId: string } }) => {
  const authors = await prisma.author.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedAuthord: AuthorColumn[] = authors.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <AuthorsClient data={formattedAuthord} />
      </div>
    </div>
  );
};

export default AuthorsPage;
