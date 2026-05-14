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
    return (
      <div className="p-8 text-center text-text-error">Error: {error}</div>
    );
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="mb-10 space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-accent">
          Latest picks
        </p>
        <h1 className="text-4xl font-bold text-text-primary">Products</h1>
        <p className="max-w-2xl text-text-secondary">BROWSE! YOU ANIMAL!</p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products by name, description, or tag..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="w-full px-4 py-3 text-text-primary transition border rounded-lg outline-none bg-input-bg border-input-border placeholder-input-placeholder focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
        />
      </div>

      <div className="mb-4 text-sm text-text-tertiary">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-bg-secondary border border-border-primary rounded-lg">
          <p className="text-text-secondary">
            No products found matching "{filters.search}"
          </p>
        </div>
      )}
    </div>
  );
}
