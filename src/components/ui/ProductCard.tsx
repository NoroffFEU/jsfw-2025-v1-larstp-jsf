import type { Product } from "../../types/product";

type ProductCardProps = {
  product: Product;
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.discountedPrice !== null && product.discountedPrice !== undefined;
  const currentPrice = hasDiscount ? product.discountedPrice : product.price;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-slate-100">
        <img
          src={product.image.url}
          alt={product.image.alt}
          className="h-full w-full object-cover"
        />

        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white">
            Sale
          </span>
        )}
      </div>

      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-slate-900">
            {product.title}
          </h2>
          <p className="line-clamp-3 text-sm text-slate-600">
            {product.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-lg font-bold text-slate-900">
              {formatPrice(currentPrice ?? product.price)}
            </p>
            {hasDiscount && (
              <p className="text-sm text-slate-500 line-through">
                {formatPrice(product.price)}
              </p>
            )}
          </div>

          <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            ★ {product.rating}
          </div>
        </div>

        {product.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {product.tags.slice(0, 3).map((tag) => (
              <li
                key={tag}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
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
