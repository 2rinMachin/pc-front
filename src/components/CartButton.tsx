'use client';

import { useCart } from '@/hooks/use-cart';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import CartDrawer from './CartDrawer';

const CartButton = () => {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative rounded-md px-3 py-2 hover:bg-black/10"
      >
        <ShoppingCart className="h-5 w-5" />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 rounded-full bg-black px-1 text-xs text-white">
            {totalItems}
          </span>
        )}
      </button>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CartButton;
