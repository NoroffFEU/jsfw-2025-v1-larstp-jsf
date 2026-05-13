import { useNavigate } from "react-router-dom";
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

export function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const hasDiscount =
    product.discountedPrice !== null && product.discountedPrice !== undefined;
  const currentPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <article
      onClick={() => navigate(`/product/${product.id}`)}
      className="overflow-hidden transition bg-white border shadow-sm cursor-pointer rounded-2xl border-slate-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] bg-slate-100">
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

      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            {product.title}
          </h2>
          <p className="text-sm line-clamp-3 text-slate-600">
            {product.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(currentPrice ?? product.price)}
            </p>
            {hasDiscount && (
              <p className="text-sm line-through text-slate-500">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <div className="px-3 py-1 text-sm font-medium rounded-full bg-amber-50 text-amber-700">
            ★ {product.rating}
          </div>
        </div>

        {product.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 list-none">
            {product.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600"
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
