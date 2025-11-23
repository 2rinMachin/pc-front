'use client';

import GoBackButton from '@/components/GoBackButton';
import Person from '@/components/icons/Person';
import { brixtonWood } from '@/fonts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin, twMerge } from 'tailwind-merge';

const links = [
  { href: '/my-account/details', label: 'Mis Detalles' },
  { href: '/my-account/orders', label: 'Historial de Pedidos' },
  { href: '/logout', label: 'Cerrar Sesión' },
] as const;

const NavPanel = () => {
  const pathname = usePathname();

  return (
    <aside className="w-100 rounded-lg bg-white p-4 shadow-sm">
      <div className="my-1">
        <GoBackButton />
      </div>
      <h1
        className={twJoin(
          brixtonWood.className,
          'mb-3 text-5xl font-normal uppercase',
        )}
      >
        Cuenta
      </h1>
      <nav className="flex flex-col gap-1">
        {links.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={twMerge(
                'flex rounded-md px-3 py-2 text-base font-medium transition-colors',
                'hover:bg-gray-100',
                active &&
                  'border-accent text-accent border-l-4 bg-gray-100 font-semibold',
              )}
            >
              <Person
                className={twMerge('mr-10 h-6 w-6', active && 'text-red-600')}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default NavPanel;
