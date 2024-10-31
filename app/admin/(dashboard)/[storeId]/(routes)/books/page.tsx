import { format } from 'date-fns';
import prisma from '@/lib/prisma';
import { formatter } from '@/lib/utils';

import { BookClient } from './components/client';
import { BookColumn } from './components/columns';

const BooksPage = async ({ params }: { params: { storeId: string } }) => {
  const books = await prisma.book.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      author: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBooks: BookColumn[] = books.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    author: item.author.name,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BookClient data={formattedBooks} />
      </div>
    </div>
  );
};

export default BooksPage;
