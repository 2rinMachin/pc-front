'use client';

import { useSearchParams } from 'next/navigation';
import { useApiClients } from '@/hooks/use-api-clients';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { formatPrice } from '@/util';
import Image from 'next/image';

const ProductPage = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');

  const apiClients = useApiClients();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () =>
      productId
        ? apiClients.catalog.getProductById({
            params: { id: productId },
          })
        : null,
    enabled: !!productId,
  });

  const [qty, setQty] = useState(1);

  const inc = () => setQty((q) => q + 1);
  const dec = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    console.log('Añadiendo al carrito:', { product: data?.body, qty });
  };

  if (isLoading || !data) {
    return (
      <main className="p-6 text-center">
        Cargando producto...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="p-6 text-center text-red-500">
        Error al cargar el producto.
      </main>
    );
  }

  if (data.status === 404) {
    return (
      <main className="p-6 text-center text-red-500">
        Producto no encontrado.
      </main>
    );
  }

  const product = data.body;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="rounded-lg border p-6 shadow">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            className="mb-6 w-full rounded-md"
          />
        )}

        <h1 className="text-3xl font-semibold">{product.name}</h1>

        <div className="mt-4 flex items-baseline gap-x-2">
          <span className="text-sm text-muted">Precio:</span>
          <span className="text-2xl font-bold text-accent">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={dec}
              className="h-8 w-8 rounded-md border text-lg font-semibold"
            >
              –
            </button>

            <span className="w-8 text-center text-lg">{qty}</span>

            <button
              onClick={inc}
              className="h-8 w-8 rounded-md border text-lg font-semibold"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="rounded-md bg-accent px-5 py-2 font-medium text-white"
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
