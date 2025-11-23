'use client';

import LoadingScreen from '@/components/LoadingScreen';
import { env } from '@/env';
import { brixtonWood } from '@/fonts';
import { useApiClients } from '@/hooks/use-api-clients';
import { WebSocketMessage } from '@/schemas/websocket-message';
import { STATUS_LABELS } from '@/util';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { LuUser } from 'react-icons/lu';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { twJoin } from 'tailwind-merge';

const DashboardPage = () => {
  const apiClients = useApiClients();

  const {
    data: orders,
    error,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => apiClients.orders.getAllOrders(),
  });

  const { readyState, lastJsonMessage, sendMessage } = useWebSocket(
    env.NEXT_PUBLIC_WEBSOCKET_URL,
  );

  useEffect(() => {
    if (readyState === ReadyState.OPEN) {
      console.log('ready');

      sendMessage(
        JSON.stringify({
          action: 'subscribe',
          tenant_id: env.NEXT_PUBLIC_TENANT_ID,
          order_id: null,
        }),
      );
    }
  }, [sendMessage, readyState]);

  useEffect(() => {
    if (!lastJsonMessage) return;

    const message = WebSocketMessage.parse(lastJsonMessage);

    if (message.kind === 'subscription_success') {
      console.log('subscribed');
      return;
    }

    if (
      message.kind === 'order_created' ||
      message.kind === 'order_status_updated'
    ) {
      refetchOrders();
      return;
    }
  }, [lastJsonMessage, refetchOrders]);

  const handleAction = async (orderId: string) => {
    await apiClients.orders.updateOrderStatus({
      params: { id: orderId },
      body: {
        status: 'cooking',
      },
    });

    await refetchOrders();
  };

  if (error) {
    console.error(error);
    return <main>Algo salió mal :(</main>;
  }

  if (!orders) return <LoadingScreen />;

  return (
    <main className="mx-auto max-w-3xl py-8">
      <h1 className={twJoin(brixtonWood.className, 'mb-8 text-6xl uppercase')}>
        Dashboard
      </h1>
      <h2 className="mb-6 text-4xl">Pedidos</h2>
      <ul className="space-y-3">
        {orders.body.map((order) => (
          <li
            key={order.order_id}
            className="space-y-3 rounded-md px-4 py-2 shadow-lg"
          >
            <div className="flex items-center justify-between gap-x-6">
              <div className="flex items-center gap-x-2">
                <LuUser className="size-6" />
                <span>{order.client.username}</span>
              </div>
              <div className="flex items-center gap-x-3">
                <button
                  onClick={() => handleAction(order.order_id)}
                  className="text-background cursor-pointer rounded bg-orange-700 px-4 py-2"
                >
                  Cocinar
                </button>
                <div className="rounded px-3 py-2">
                  {STATUS_LABELS[order.status]}
                </div>
              </div>
            </div>
            <ul>
              {order.items.map((item, i) => (
                <li key={i}>
                  {item.product.name} x{item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default DashboardPage;
