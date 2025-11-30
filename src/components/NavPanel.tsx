'use client';

import GoBackButton from '@/components/GoBackButton';
import Person from '@/components/icons/Person';
import { brixtonWood } from '@/fonts';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { twJoin, twMerge } from 'tailwind-merge';
import Clock from './icons/Clock';
import LogOut from './icons/LogOut';

const links = [
  { href: '/my-account/details', label: 'Mis Detalles', Icon: Person },
  { href: '/my-account/orders', label: 'Mis Pedidos', Icon: Clock },
  { href: '/logout', label: 'Cerrar Sesión', Icon: LogOut },
] as const;

const NavPanel = () => {
  const pathname = usePathname();

  return (
    <aside className="h-full w-80 rounded-lg bg-white p-4 shadow-sm">
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
          const active = pathname.startsWith(item.href);
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
              <item.Icon
                className={twMerge('mr-10 h-6 w-6', active && 'text-accent')}
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
