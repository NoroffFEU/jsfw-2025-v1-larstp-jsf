import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage";
import { useCart } from "./hooks/useCart";
import { ToastContainer } from "./components/ui/ToastContainer";

function App() {
  const navigate = useNavigate();
  const { items } = useCart();

  return (
    <>
      <div className="flex flex-col min-h-screen bg-dark-bg text-text-primary">
        {/* Header */}
        <header className="border-b bg-dark-bg border-border-primary">
          <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold text-teal-accent">
              Mr. Fantastic's Online Emporium
            </h1>
            <button
              onClick={() => navigate("/cart")}
              className="text-sm font-medium text-orange-accent hover:text-orange-accent/80"
            >
              Cart: {items.reduce((total, item) => total + item.quantity, 0)}
            </button>
          </div>
        </header>

        {/* Main stuffs */}
        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          </Routes>
        </main>

        {/* Footer? */}
        <footer className="mt-12 border-t text-text-primary bg-bg-tertiary border-border-primary">
          <div className="px-4 py-8 mx-auto max-w-7xl">
            <p>&copy; 2026 Online Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
