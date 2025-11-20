const products = [
  {
    name: "Pizza Familiar Crown",
    description: "Lorem ipsum dolor sit amet.",
    price: 49.9,
  },
  {
    name: "Pizza Familiar Crown",
    description: "Lorem ipsum dolor sit amet.",
    price: 49.9,
  },
  {
    name: "Pizza Familiar Crown",
    description: "Lorem ipsum dolor sit amet.",
    price: 49.9,
  },
] as const;

const HomePage = () => {
  return (
    <>
      <main className="py-8 px-4 mx-auto max-w-4xl">
        <h2 className="text-2xl font-semibold mb-6">
          Nuestras ofertas más populares
        </h2>
        <ul className="grid grid-cols-2 gap-4">
          {products.map((product, i) => (
            <li key={i} className="shadow-lg rounded-lg cursor-pointer">
              <div className="px-2 py-3">
                <h3 className="uppercase font-semibold text-xl">
                  {product.name}
                </h3>
                <p className="text-muted my-2">{product.description}</p>
                <div className="flex items-end gap-x-1">
                  <span className="text-sm">Desde</span>{" "}
                  <div className="min-h-7 inline-flex items-center">
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
