import { useEffect, useState } from "react";
import { ProductCard } from "../components/ui/ProductCard";
import { getProducts } from "../services/products";
import type { Product } from "../types/product";
import type { ProductFilters } from "../types/shop";
import SortIcon from "../assets/ic_sharp-sort.svg";

type SortOption = "none" | "sale" | "price-high-low" | "price-low-high";

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFilters>({ search: "" });
  const [sortOption, setSortOption] = useState<SortOption>("none");
  const [isSortOpen, setIsSortOpen] = useState(false);

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

  let sortedProducts: Product[] = filteredProducts;

  if (sortOption !== "none") {
    // I have no idea if this is the way to do it. it looks TERRIBLE, but it works.
    sortedProducts = [...filteredProducts].sort((left, right) => {
      const leftHasDiscount =
        left.discountedPrice !== null && left.discountedPrice !== undefined;
      const rightHasDiscount =
        right.discountedPrice !== null && right.discountedPrice !== undefined;

      if (sortOption === "sale") {
        if (leftHasDiscount !== rightHasDiscount) {
          return leftHasDiscount ? -1 : 1;
        }

        if (leftHasDiscount && rightHasDiscount) {
          const leftDiscount = left.discountedPrice ?? left.price;
          const rightDiscount = right.discountedPrice ?? right.price;
          return leftDiscount - rightDiscount;
        }

        return left.title.localeCompare(right.title);
      }

      if (sortOption === "price-high-low") {
        const leftPrice = left.discountedPrice ?? left.price;
        const rightPrice = right.discountedPrice ?? right.price;
        return rightPrice - leftPrice;
      }

      const leftPrice = left.discountedPrice ?? left.price;
      const rightPrice = right.discountedPrice ?? right.price;
      return leftPrice - rightPrice;
    });
  }

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
      <div className="p-6 mb-10 space-y-3 bg-black/30 backdrop-blur-sm rounded-2xl">
        <h1 className="text-4xl font-bold text-white mix-blend-difference">
          Welcome to Butta!
        </h1>
        <p className="max-w-2xl italic font-thin text-white mix-blend-difference">
          "Butta" is the Norwegian slang term for "Store", Short for "Butikk"
        </p>
        <p className="max-w-2xl text-white mix-blend-difference">
          Browse our lates and greatest items!
        </p>
      </div>

      <div className="flex flex-col gap-3 mb-8 md:flex-row md:items-start">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products by name, description, or tag..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full px-4 py-3 transition border rounded-lg outline-none text-text-primary bg-input-bg border-input-border placeholder-input-placeholder focus:border-teal-accent focus:ring-2 focus:ring-teal-accent/30"
          />
        </div>

        <div className="relative md:w-56">
          <button
            type="button"
            onClick={() => setIsSortOpen((open) => !open)}
            className="flex items-center justify-center w-full gap-3 px-4 py-3 app-button"
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
            aria-label={`Sort options. Current: ${
              sortOption === "none"
                ? "Newest"
                : sortOption === "sale"
                  ? "Sale"
                  : sortOption === "price-high-low"
                    ? "Price high to low"
                    : "Price low to high"
            }`}
          >
            <img src={SortIcon} alt="Sort" className="w-5 h-5" />
            <span className="ml-3 text-sm text-text-tertiary">
              {sortOption === "none"
                ? "Newest"
                : sortOption === "sale"
                  ? "SALE"
                  : sortOption === "price-high-low"
                    ? "Price: high→low"
                    : "Price: low→high"}
            </span>
          </button>

          {isSortOpen && (
            <div className="absolute right-0 top-full z-30 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-2 shadow-[0_20px_60px_rgba(0,0,0,0.55)] backdrop-blur-sm">
              {[
                { value: "sale", label: "SALE" },
                { value: "price-high-low", label: "Price: high to low" },
                { value: "price-low-high", label: "Price: low to high" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setSortOption(option.value as SortOption);
                    setIsSortOpen(false);
                  }}
                  className="block w-full px-5 py-3 text-sm leading-6 text-left transition-colors duration-150 bg-transparent rounded-lg text-text-primary hover:bg-white/95 hover:text-black hover:shadow-lg"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 text-sm text-text-tertiary">
        Showing {sortedProducts.length} of {products.length} products
      </div>

      {sortedProducts.length > 0 ? (
        <div className="rounded-4xl border border-white/10 bg-black/30 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-8 text-center border rounded-lg bg-bg-secondary border-border-primary">
          <p className="text-text-secondary">
            No products found matching "{filters.search}"
          </p>
        </div>
      )}
    </div>
  );
}
