'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { useApiClients } from '@/hooks/use-api-clients';
import { OrderStatus } from '@/schemas/order';
import { dayjs } from '@/util';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { LuCalendar } from 'react-icons/lu';

const statusMessages: Record<OrderStatus, string> = {
  wait_for_cook: 'siendo procesado',
  cooking: 'en la cocina',
  wait_for_dispatcher: 'por ser despachado',
  dispatching: 'siendo despachado',
  wait_for_deliverer: 'esperando un conductor',
  delivering: 'llegando',
  complete: 'entregado',
};

const OrderPage = () => {
  const params = useSearchParams();
  const orderId = params.get('id');
  const apiClients = useApiClients();

  const {
    data: orderData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () =>
      orderId
        ? apiClients.orders.getOrderById({ params: { id: orderId } })
        : null,
  });

  if (isLoading || !orderData) return <LoadingScreen />;

  if (error) {
    console.error(error);
    return <main>Algo salió mal :(</main>;
  }

  if (orderData.status === 404) {
    return <main>Orden no encontrada.</main>;
  }

  const order = orderData.body;
  const lastEntry = order.history[0];
  const lastDate = lastEntry?.date ?? order.created_at;

  return (
    <main className="px-6 py-4">
      <h1 className="mb-12 text-lg">
        Pedido <span className="font-mono">{order.order_id}</span>
      </h1>

      <div className="my-24 text-center">
        <p className="mb-4 text-4xl">
          Tu pedido está{' '}
          <span className="font-semibold">{statusMessages[order.status]}</span>.
        </p>
        <div className="text-xl">
          <span className="text-muted">Última actualización:</span>{' '}
          {dayjs().locale('es').to(lastDate)}
        </div>
      </div>

      <hr className="border-muted my-12" />
      <div className="text-muted">
        <LuCalendar className="mr-2 inline" />
        Realizado el{' '}
        {dayjs(order.created_at)
          .locale('es')
          .format('D [de] MMMM [a las] hh:mm A')}
      </div>
      <ul className="my-5 list-disc text-lg">
        {order.items.map((item, idx) => (
          <li key={idx}>
            <p>
              {item.product.name} x{item.quantity}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default OrderPage;
