import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/products";
import { useCart } from "../hooks/useCart";
import type { Product } from "../types/product";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
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
        <p className="text-red-500 mb-4">
          Error: {error || "Product not found"}
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const hasDiscount =
    product.discountedPrice !== null && product.discountedPrice !== undefined;
  const currentPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate("/")}
        className="mb-8 text-rose-600 hover:text-rose-700 font-medium"
      >
        ← Back to Shop
      </button>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Image */}
        <div>
          <div className="relative aspect-[4/3] bg-slate-100 rounded-lg overflow-hidden">
            <img
              src={product.image.url}
              alt={product.image.alt}
              className="object-cover w-full h-full"
            />
            {hasDiscount && (
              <span className="absolute px-3 py-1 text-xs font-semibold text-white rounded-full left-3 top-3 bg-rose-600">
                Sale
              </span>
            )}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {product.title}
            </h1>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-amber-50 text-amber-700">
                ★ {product.rating}
              </span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="space-y-2">
            <p className="text-3xl font-bold text-slate-900">
              {formatPrice(currentPrice ?? product.price)}
            </p>
            {hasDiscount && (
              <p className="text-lg line-through text-slate-500">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          {/* Tags */}
          {product.tags.length > 0 && (
            <div>
              <p className="text-sm font-medium text-slate-600 mb-2">Tags:</p>
              <ul className="flex flex-wrap gap-2 list-none">
                {product.tags.map((tag) => (
                  <li
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={() =>
              addToCart({
                productId: product.id,
                title: product.title,
                price: currentPrice ?? product.price,
              })
            }
            className="w-full px-6 py-3 bg-rose-600 text-white font-semibold rounded-lg hover:bg-rose-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-16 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Reviews</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div
                key={review.id}
                className="p-4 border border-slate-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900">
                    {review.username}
                  </p>
                  <span className="text-amber-600">★ {review.rating}</span>
                </div>
                <p className="text-slate-600 text-sm">{review.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
