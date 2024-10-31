'use client';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';

import { AuthorColumn, columns } from './columns';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';
import { DataTable } from '@/components/ui/data-table';

interface AuthorsClientProps {
  data: AuthorColumn[];
}
export const AuthorsClient: React.FC<AuthorsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Authors (${data.length})`}
          description='Manage sizes for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API calls for sizes' />
      <Separator />
      <ApiList entityName='sizes' entityIdName='sizeId'/>
    </>
  );
};
