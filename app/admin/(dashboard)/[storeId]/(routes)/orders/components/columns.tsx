'use client';

import { ColumnDef } from '@tanstack/react-table';

export type OrderColumn = {
  id: string;
  phone: string;
  address: string;
  isPaid: boolean;
  totalPrice: string;
  books: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: 'books',
    header: 'Books',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'totalPrice',
    header: 'Total Price',
  },
  {
    accessorKey: 'isPaid',
    header: 'Paid',
  },
];
