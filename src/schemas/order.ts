import { z } from 'zod';
import { Product } from './product';
import { User } from './user';

export const ORDER_STATUSES = [
  'wait_for_cook',
  'cooking',
  'wait_for_dispatcher',
  'dispatching',
  'wait_for_deliverer',
  'delivering',
  'complete',
] as const;

export const OrderStatus = z.literal(ORDER_STATUSES);
export type OrderStatus = z.infer<typeof OrderStatus>;

export const OrderItem = z.object({
  product: Product,
  quantity: z.int(),
});

export type OrderItem = z.infer<typeof OrderItem>;

export const Order = z.object({
  tenant_id: z.string(),
  order_id: z.string(),
  client: User,
  items: z.array(OrderItem),
  status: OrderStatus,
});

export type Order = z.infer<typeof Order>;
