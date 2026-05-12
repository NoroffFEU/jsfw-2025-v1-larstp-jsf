import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import type { Product } from "../types/product";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        setProducts(response.data);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch products";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 bg-white shadow"
          >
            <img
              src={product.image.url}
              alt={product.image.alt}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <span className="text-lg font-bold">
                  ${product.discountedPrice ?? product.price}
                </span>
                {product.discountedPrice && (
                  <span className="ml-2 line-through text-gray-500">
                    ${product.price}
                  </span>
                )}
              </div>
              <span className="text-yellow-500">★ {product.rating}</span>{" "}
              {/* Ill make a better one later */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
