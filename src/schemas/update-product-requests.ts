import { z } from 'zod';

export const UpdateProductRequest = z.object({
  name: z.string().nonempty(),
  price: z.number(),
});

export type UpdateProductRequest = z.infer<typeof UpdateProductRequest>;
