const products = [
  {
    name: 'Pizza Familiar Crown',
    description: 'Lorem ipsum dolor sit amet.',
    price: 49.9,
  },
  {
    name: 'Pizza Familiar Crown',
    description: 'Lorem ipsum dolor sit amet.',
    price: 49.9,
  },
  {
    name: 'Pizza Familiar Crown',
    description: 'Lorem ipsum dolor sit amet.',
    price: 49.9,
  },
] as const;

const HomePage = () => {
  return (
    <>
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h2 className="mb-6 text-2xl font-semibold">
          Nuestras ofertas más populares
        </h2>
        <ul className="grid grid-cols-2 gap-4">
          {products.map((product, i) => (
            <li key={i} className="cursor-pointer rounded-lg shadow-md">
              <div className="px-2 py-3">
                <h3 className="text-xl font-semibold uppercase">
                  {product.name}
                </h3>
                <p className="text-muted my-2">{product.description}</p>
                <div className="flex items-end gap-x-1">
                  <span className="text-sm">Desde</span>{' '}
                  <div className="inline-flex min-h-7 items-center">
                    <span className="text-accent text-xl font-semibold">
                      S/.{product.price}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default HomePage;
