import { Routes, Route, useNavigate } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage";
import { ContactPage } from "./pages/ContactPage";
import { useCart } from "./hooks/useCart";
import { ToastContainer } from "./components/ui/ToastContainer";
import Grainient from "./components/Grainient";

function App() {
  const navigate = useNavigate();
  const { items } = useCart();

  return (
    <>
      <div className="fixed inset-0 z-0 h-screen w-screen bg-dark-bg">
        <Grainient
          color1="#e6ac24"
          color2="#3d2b00"
          color3="#000000"
          timeSpeed={0.25}
          zoom={0.9}
        />
      </div>
      <div className="flex flex-col min-h-screen text-text-primary relative z-10 bg-transparent">
        <header className="border-b border-border-primary bg-transparent">
          <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold text-teal-accent">
              Mr. Fantastic's Online Emporium
            </h1>
            <div className="flex items-center gap-6">
              <button
                onClick={() => navigate("/contact")}
                className="text-sm font-medium text-orange-accent hover:text-orange-accent/80"
              >
                Contact
              </button>
              <button
                onClick={() => navigate("/cart")}
                className="text-sm font-medium text-orange-accent hover:text-orange-accent/80"
              >
                Cart: {items.reduce((total, item) => total + item.quantity, 0)}
              </button>
            </div>
          </div>
        </header>

        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <footer className="mt-12 border-t text-text-primary bg-transparent border-border-primary">
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
