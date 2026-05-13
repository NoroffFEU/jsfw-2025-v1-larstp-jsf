import { useEffect, useState } from "react";
import { ProductCard } from "../components/ui/ProductCard";
import { getProducts } from "../services/products";
import type { Product } from "../types/product";
import type { ProductFilters } from "../types/shop";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({ search: "" });

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

  const filteredProducts = products.filter((product) => {
    if (!filters.search) return true;
    const searchLower = filters.search.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-10 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-500">
          Latest picks
        </p>
        <h1 className="text-4xl font-bold text-slate-900">Products</h1>
        <p className="max-w-2xl text-slate-600">BROWSE! YOU ANIMAL!</p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products by name, description, or tag..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full px-4 py-3 transition border rounded-lg outline-none border-slate-300 text-slate-900 placeholder-slate-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-200"
        />
      </div>

      <div className="mb-4 text-sm text-slate-600">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center border rounded-lg border-slate-200 bg-slate-50">
          <p className="text-slate-600">
            No products found matching "{filters.search}"
          </p>
        </div>
      )}
    </div>
  );
}
