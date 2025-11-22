
import GoBackButton from '@/components/GoBackButton';
import OrdersButton from '@/components/OrdersButton';
import { brixtonWood } from '@/fonts';
import z from 'zod';
import { useApiClients } from '@/hooks/use-api-clients';
import { RegisterRequest } from '@/schemas/register-request';
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { twJoin } from 'tailwind-merge';
import { User } from '@/schemas/user';

const ProfilePage = () => {

const { users } = useApiClients();
//const [user, setUser] = useState<User | null>(null);
// const [error, setError] = useState<string | null>(null);

type UserType = z.infer<typeof User>;

const {
    data: userData,
    isPending: userPending,
    error: userError,
  } = useQuery<Awaited<ReturnType<typeof users.getSelf>>>({
    queryKey: ["user", "self"],
    queryFn: () => users.getSelf(),
  });
  
const roleMap: Record<User["role"], string> = {
  client: "CLIENTE",
  cook: "COCINERO",
  dispatcher: "DESPACHADOR",
  driver: "CONDUCTOR",
  admin: "ADMIN",
};


if (userError || !userData || userData.status !== 200)
    return (
      <p className="text-center py-8 text-red-500">Usuario no encontrado.</p>
    );

const user = userData.body;

return (
    <main className="mx-auto my-6 max-w-lg">
      <div className="my-1">
        <GoBackButton />
        <OrdersButton />
      </div>
      <h1
        className={twJoin(
          brixtonWood.className,
          'mb-3 text-5xl font-normal uppercase',
        )}
      >
        Información de usuario
      </h1>
      <section className="my-6 space-y-5">
      <div className="border-muted block w-full rounded border px-3 py-4 bg-neutral-100">
        <h2 className="text-sm text-neutral-500">Nombre de usuario</h2>
        <p className="text-lg font-semibold text-neutral-900">{user.username}</p>
      </div>

      <div className="border-muted block w-full rounded border px-3 py-4 bg-neutral-100">
        <h2 className="text-sm text-neutral-500">Correo electrónico</h2>
        <p className="text-lg font-semibold text-neutral-900">{user.email}</p>
      </div>
      <div className="border-muted block w-full rounded border px-3 py-4 bg-neutral-100">
        <h2 className="text-sm text-neutral-500">Rol</h2>
        <p className="text-lg font-semibold text-neutral-900">
          {roleMap[user.role]}
        </p>
      </div>

    </section>
    </main>
  );
};

export default ProfilePage;
