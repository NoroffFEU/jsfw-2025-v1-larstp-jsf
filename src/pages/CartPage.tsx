import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useToast } from "../hooks/useToast";

export function CartPage() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity } = useCart();
  const { addToast } = useToast();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleRemove = (productId: string, title: string) => {
    removeFromCart(productId);
    addToast(`Removed ${title} from cart`, "success");
  };

  const handleCheckout = () => {
    navigate("/checkout-success");
  };

  if (items.length === 0) {
    return (
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold text-text-primary">
          Shopping Cart
        </h1>
        <div className="rounded-2xl border border-white/10 bg-black/40 p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
          <p className="mb-4 text-text-secondary">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 app-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold text-text-primary">
        Shopping Cart
      </h1>

      <div className="mb-8 space-y-4 rounded-4xl border border-white/10 bg-black/25 p-4 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
        {items.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between gap-4 p-4 border rounded-2xl border-white/10 bg-black/55 backdrop-blur-2xl"
          >
            <div className="flex-1">
              <p className="mb-2 font-semibold text-text-primary">
                {item.title}
              </p>
              <p className="text-text-secondary">
                €{item.price.toFixed(2)} each
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity - 1)
                }
                className="px-3 py-2 text-sm app-button"
              >
                -
              </button>
              <span className="px-4 py-1 rounded bg-card-bg text-text-primary">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                className="px-3 py-2 text-sm app-button"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="mb-2 font-semibold text-text-primary">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item.productId, item.title)}
                className="px-4 py-2 text-sm app-button"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-8 rounded-2xl border border-white/10 bg-black/55 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="flex items-center justify-between mb-6">
          <p className="text-text-secondary">Subtotal:</p>
          <p className="font-semibold text-text-primary">€{total.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-border-primary">
          <p className="text-lg font-bold text-text-primary">Total:</p>
          <p className="text-lg font-bold text-orange-accent">
            €{total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex-1 px-4 py-3 app-button"
        >
          Continue Shopping
        </button>
        <button
          onClick={handleCheckout}
          className="flex-1 px-4 py-3 font-semibold app-button"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
