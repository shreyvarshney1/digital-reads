import prisma from '@/lib/prisma';

import { BookForm } from './components/book-form';

const BookPage = async ({
  params,
}: {
  params: { bookId: string; storeId: string };
}) => {
  const book = await prisma.book.findUnique({
    where: {
      id: params.bookId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const authors = await prisma.author.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BookForm
          categories={categories}
          authors={authors}
          initialData={book}
        />
      </div>
    </div>
  );
};

export default BookPage;
