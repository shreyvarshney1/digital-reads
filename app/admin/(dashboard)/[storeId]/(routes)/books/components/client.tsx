'use client';
import React from 'react';

import { useParams, useRouter } from 'next/navigation';

import { BookColumn, columns } from './columns';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';
import { DataTable } from '@/components/ui/data-table';

interface BookClientProps {
  data: BookColumn[];
}
export const BookClient: React.FC<BookClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Books (${data.length})`}
          description='Manage books for your store'
        />
        <Button onClick={() => router.push(`/admin/${params.storeId}/books/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API calls for Books' />
      <Separator />
      <ApiList entityName='books' entityIdName='bookId' />
    </>
  );
};
