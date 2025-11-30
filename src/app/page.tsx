'use client';

import { useApiClients } from '@/hooks/use-api-clients';
import { Product } from '@/schemas/product';
import { formatPrice } from '@/util';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const apiClients = useApiClients();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['product-list'],
    queryFn: () => apiClients.catalog.getAllProducts(),
  });

  const products = data?.body;

  const handleClick = (product: Product) => {
    router.push(`/product?product_id=${product.product_id}`);
  };

  return (
    <>
      <main className="mx-auto max-w-4xl px-4 py-8">
        {products && (
          <>
            <h2 className="mb-6 text-2xl font-semibold">
              Nuestras ofertas más populares
            </h2>

            <ul className="grid grid-cols-2 gap-4">
              {products.map((product, i) => (
                <li
                  key={i}
                  className="hover:bg-accent/10 cursor-pointer rounded-lg shadow-md transition"
                  onClick={() => handleClick(product)}
                >
                  <div className="px-2 py-3">
                    <h3 className="text-xl font-semibold uppercase">
                      {product.name}
                    </h3>
                    <p className="text-muted my-2">{product.name}</p>
                    <div className="flex items-end gap-x-1">
                      <span className="text-sm">Desde</span>{' '}
                      <div className="inline-flex min-h-7 items-center">
                        <span className="text-accent text-xl font-semibold">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </main>
    </>
  );
};

export default HomePage;
