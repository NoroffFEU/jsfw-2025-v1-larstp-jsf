import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../hooks/useCart";

export function CheckoutSuccessPage() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center min-h-96">
        <div className="text-center space-y-6">
          <p className="text-6xl">✓</p>
          <h1 className="text-4xl font-bold text-text-primary">
            Order Confirmed!
          </h1>
          <p className="text-text-secondary text-lg max-w-md">
            Thank you for your purchase. Your order has been successfully placed
            and will be processed soon.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-teal-accent text-white rounded-lg hover:bg-teal-accent/80 font-semibold inline-block"
          >
            Back to Shop
          </button>
        </div>
      </div>
    </div>
  );
}
