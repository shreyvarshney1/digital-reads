'use client';

import { useParams, useRouter } from 'next/navigation';

import { BillboardColumn, columns } from './columns';

import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { ApiList } from '@/components/ui/api-list';
import { DataTable } from '@/components/ui/data-table';

interface BillboardClientProps {
  data: BillboardColumn[];
}
export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Billboards (${data.length})`}
          description='Manage billboards for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className='mr-2 h-4 w-4' />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data} />
      <Heading title='API' description='API calls for billboards' />
      <Separator />
      <ApiList entityName='billboards' entityIdName='billboardId'/>
    </>
  );
};
