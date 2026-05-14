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
        <h1 className="text-3xl font-bold text-text-primary mb-6">
          Shopping Cart
        </h1>
        <div className="p-8 text-center bg-bg-secondary border border-border-primary rounded-lg">
          <p className="text-text-secondary mb-4">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-teal-accent text-white rounded-lg hover:bg-teal-accent/80"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-text-primary mb-8">
        Shopping Cart
      </h1>

      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.productId}
            className="p-4 bg-black/40 backdrop-blur-lg border border-border-primary rounded-lg flex items-center justify-between gap-4"
          >
            <div className="flex-1">
              <p className="text-text-primary font-semibold mb-2">
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
                className="px-2 py-1 bg-border-primary text-text-primary rounded hover:bg-border-primary/80"
              >
                -
              </button>
              <span className="px-4 py-1 bg-card-bg text-text-primary rounded">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.productId, item.quantity + 1)
                }
                className="px-2 py-1 bg-border-primary text-text-primary rounded hover:bg-border-primary/80"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="text-text-primary font-semibold mb-2">
                €{(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => handleRemove(item.productId, item.title)}
                className="px-3 py-1 bg-text-error text-white rounded hover:bg-text-error/80"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-black/40 backdrop-blur-lg border border-border-primary rounded-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-text-secondary">Subtotal:</p>
          <p className="text-text-primary font-semibold">€{total.toFixed(2)}</p>
        </div>
        <div className="border-t border-border-primary pt-4 flex justify-between items-center">
          <p className="text-text-primary font-bold text-lg">Total:</p>
          <p className="text-orange-accent font-bold text-lg">
            €{total.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="flex-1 px-4 py-3 bg-border-primary text-text-primary rounded-lg hover:bg-border-primary/80"
        >
          Continue Shopping
        </button>
        <button
          onClick={handleCheckout}
          className="flex-1 px-4 py-3 bg-orange-accent text-white rounded-lg hover:bg-orange-accent/80 font-semibold"
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
