import { z } from 'zod';
import { OrderItem } from './order';

export const CreateOrderRequest = z.object({
  items: z.array(OrderItem),
});

export type CreateOrderRequest = z.infer<typeof CreateOrderRequest>;
