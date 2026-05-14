import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useToast } from "../../hooks/useToast";
import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function AddToCartButtonInline({
  product,
  currentPrice,
}: {
  product: Product;
  currentPrice: number | null | undefined;
}) {
  const { addToCart } = useCart();
  const { addToast } = useToast();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        addToCart({
          productId: product.id,
          title: product.title,
          price: currentPrice ?? product.price,
        });
        addToast(`Added ${product.title} to cart`, "success");
      }}
      aria-label={`Add ${product.title} to cart`}
      className="inline-flex items-center justify-center w-full text-lg font-semibold border-2 rounded-md shadow-sm h-11 bg-orange-accent text-dark-bg border-orange-accent hover:bg-orange-accent/90 focus:outline-none focus:ring-2 focus:ring-orange-accent/30"
      style={{ color: "var(--dark-bg)" }}
    >
      Add to cart
    </button>
  );
}

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
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
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="flex flex-col transition border shadow-sm cursor-pointer bg-card-bg rounded-2xl border-card-border hover:-translate-y-1 hover:shadow-lg hover:shadow-teal-accent/20"
    >
      <div className="relative overflow-hidden rounded-t-2xl aspect-4/3 bg-card-img-bg">
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
              padding: "6px 40px",
              display: "inline-block",
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            }}
          >
            {discountPercent}% OFF
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex-1 space-y-2">
          <h2 className="text-lg font-semibold text-(--teal)">
            {product.title}
          </h2>
          <p className="text-sm text-text-secondary line-clamp-3">
            {product.description}
          </p>
        </div>

        <div className="flex items-stretch justify-between gap-4 mt-4">
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <p className="text-lg font-bold text-teal-accent">
              {formatPrice(currentPrice ?? product.price)}
            </p>
            {hasDiscount && (
              <p className="text-sm line-through text-text-muted">
                {formatPrice(product.price)}
              </p>
            )}
            <div className="w-full max-w-xs mt-3">
              <AddToCartButtonInline
                product={product}
                currentPrice={currentPrice}
              />
            </div>
          </div>

          <div className="inline-flex items-center justify-center px-4 text-sm font-medium border-2 rounded-md h-11 bg-dark-bg text-(--teal) border-white self-end">
            ★ {product.rating}
          </div>
        </div>

        {product.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4 list-none">
            {product.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="px-3 py-1 text-xs font-medium border rounded-full bg-(--teal) border-white"
                style={{ color: "var(--dark-bg)" }}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
