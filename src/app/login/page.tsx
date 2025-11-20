import GoBackButton from '@/components/GoBackButton';
import { brixtonWood } from '@/fonts';
import Link from 'next/link';
import { twJoin } from 'tailwind-merge';

const LoginPage = () => {
  return (
    <main className="mx-auto my-6 max-w-lg">
      <div className="my-1">
        <GoBackButton />
      </div>
      <h1
        className={twJoin(
          brixtonWood.className,
          'mb-3 text-5xl font-normal uppercase',
        )}
      >
        Iniciar sesión
      </h1>
      <p>
        Usuario nuevo?{' '}
        <Link href="/register" className="text-link underline">
          Crear una cuenta
        </Link>
      </p>
      <form className="my-6 space-y-5">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="border-muted block w-full rounded border px-3 py-4"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border-muted block w-full rounded border px-3 py-4"
        />
        <button className="bg-accent text-background block w-full cursor-pointer rounded px-3 py-3 transition-all hover:brightness-85">
          Iniciar Sesión
        </button>
      </form>
    </main>
  );
};

export default LoginPage;
