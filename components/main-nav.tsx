'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';

export const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      label: 'Dashboard',
      href: `/${params.storeId}`,
      active: pathname === `/${params.storeId}`,
    },
    {
      label: 'Billboards',
      href: `/${params.storeId}/billboards`,
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      label: 'Categories',
      href: `/${params.storeId}/categories`,
      active: pathname === `/${params.storeId}/categories`,
    },
    {
      label: 'Sizes',
      href: `/${params.storeId}/sizes`,
      active: pathname === `/${params.storeId}/sizes`,
    },
    {
      label: 'Colors',
      href: `/${params.storeId}/colors`,
      active: pathname === `/${params.storeId}/colors`,
    },
    {
      label: 'Settings',
      href: `/${params.storeId}/settings`,
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn(className, 'flex items-center space-x-4 lg:space-x-6')}>
      {routes.map((route, index) => (
        <Link
          key={index}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground',
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
