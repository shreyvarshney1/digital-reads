'use client';

import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/admin/${params.storeId}`,
      label: 'Overview',
      active: pathname === `/admin/${params.storeId}`,
    },
    {
      href: `/admin/${params.storeId}/billboards`,
      label: 'Billboards',
      active: pathname === `/admin/${params.storeId}/billboards`,
    },
    {
      href: `/admin/${params.storeId}/categories`,
      label: 'Categories',
      active: pathname === `/admin/${params.storeId}/categories`,
    },
    {
      href: `/admin/${params.storeId}/authors`,
      label: 'Authors',
      active: pathname === `/admin/${params.storeId}/authors`,
    },
    {
      href: `/admin/${params.storeId}/books`,
      label: 'Books',
      active: pathname === `/admin/${params.storeId}/books`,
    },
    {
      href: `/admin/${params.storeId}/orders`,
      label: 'Orders',
      active: pathname === `/admin/${params.storeId}/orders`,
    },
    {
      href: `/admin/${params.storeId}/settings`,
      label: 'Settings',
      active: pathname === `/admin/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn('flex items-center space-x-4 lg:space-x-6', className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
