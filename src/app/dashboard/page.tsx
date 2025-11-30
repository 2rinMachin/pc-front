import { brixtonWood } from '@/fonts';
import Link from 'next/link';
import { LuCar, LuNewspaper } from 'react-icons/lu';
import { twJoin } from 'tailwind-merge';

const DashboardPage = () => {
  return (
    <main className="mx-auto max-w-4xl py-12">
      <h1 className={twJoin(brixtonWood.className, 'mb-8 text-6xl uppercase')}>
        Dashboard
      </h1>
      <nav className="wrap flex justify-center gap-x-8 gap-y-3 text-xl">
        <Link
          href="/dashboard/panel"
          className="bg-accent text-background rounded px-6 py-3"
        >
          <LuCar className="mr-2 inline" />
          Panel de atención
        </Link>
        <Link
          href="/dashboard/orders"
          className="bg-accent text-background rounded px-6 py-3"
        >
          <LuNewspaper className="mr-2 inline" />
          Todos los pedidos
        </Link>
      </nav>
    </main>
  );
};

export default DashboardPage;
