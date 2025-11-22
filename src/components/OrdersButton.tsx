'use client';

import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import RightArrow from './icons/RightArrow';

export interface Props extends HTMLAttributes<HTMLButtonElement> {}

const OrdersButton = ({ className, ...props }: Props) => {
  const router = useRouter();

  return (
    <button
      {...props}
      onClick={() => router.push("/my-account/orders")}
      className={twMerge(
        className,
        'outline-text text-accent flex cursor-pointer items-center gap-x-1 rounded px-2 py-3 focus:outline-2',
      )}
    >
      <span>Mis pedidos</span>
      <RightArrow className="size-6" />
    </button>
  );
};

export default OrdersButton;