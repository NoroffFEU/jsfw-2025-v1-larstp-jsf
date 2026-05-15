import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/products";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";
import type { Product } from "../types/product";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
  {
    /* eew I accidentally put dollars */
  }
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setError("Product ID not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getProductById(id);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch product";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="p-8 text-center">
        <p className="mb-4 text-text-error">
          Error: {error || "Product not found"}
        </p>
        <button onClick={() => navigate("/")} className="px-4 py-2 app-button">
          Back to Shop
        </button>
      </div>
    );
  }

  const hasDiscount =
    product.discountedPrice !== null && product.discountedPrice !== undefined;
  const currentPrice = hasDiscount ? product.discountedPrice : product.price;
  const discountPercent =
    hasDiscount && product.price > 0
      ? Math.round(
          ((product.price - (product.discountedPrice ?? product.price)) /
            product.price) *
            100,
        )
      : 0;

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 mb-8 text-sm app-button"
      >
        ← Back to Shop
      </button>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div>
          <div className="relative overflow-hidden rounded-lg aspect-4/3 bg-card-img-bg">
            <img
              src={product.image.url}
              alt={product.image.alt}
              className="object-cover w-full h-full"
            />
            {hasDiscount && discountPercent > 0 && (
              <span
                className="absolute left-0 text-xs font-bold text-text-primary"
                style={{
                  top: "24px",
                  transform: "translate(-25%, -25%) rotate(-45deg)",
                  backgroundColor: "var(--text-error)",
                  padding: "6px 48px",
                  display: "inline-block",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
                }}
              >
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        <div className="space-y-6 ">
          <div>
            <h1 className="mb-2 text-3xl font-bold text-text-primary">
              {product.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-amber-900 text-amber-300">
                ★ {product.rating}
              </span>
            </div>
          </div>

          <p className="leading-relaxed text-text-secondary">
            {product.description}
          </p>

          <div className="space-y-2">
            <p className="text-3xl font-bold text-teal-accent">
              {formatPrice(currentPrice ?? product.price)}
            </p>
            {hasDiscount && (
              <p className="text-lg line-through text-text-muted">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          {product.tags.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-medium text-text-secondary">
                Tags:
              </p>
              <ul className="flex flex-wrap gap-2 list-none">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full text-text-light bg-card-bg"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => {
              addToCart({
                productId: product.id,
                title: product.title,
                price: currentPrice ?? product.price,
              });
              addToast(`Added ${product.title} to cart`, "success");
            }}
            className="w-full px-6 py-3 text-lg app-button"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-16 space-y-6 rounded-4xl border border-white/10 bg-black/25 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
          <h2 className="text-2xl font-bold text-text-primary">Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border rounded-2xl border-white/10 bg-black/55 backdrop-blur-2xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-text-primary">
                    {review.username}
                  </p>
                  <span className="text-amber-400">★ {review.rating}</span>
                </div>
                <p className="text-sm text-text-secondary">
                  {review.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
