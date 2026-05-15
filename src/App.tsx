import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { CheckoutSuccessPage } from "./pages/CheckoutSuccessPage";
import { ContactPage } from "./pages/ContactPage";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { ToastContainer } from "./components/ui/ToastContainer";
import Grainient from "./components/Grainient";

function App() {
  return (
    <>
      <div className="fixed inset-0 z-0 w-screen h-screen bg-dark-bg">
        <Grainient
          color1="#e6ac24"
          color2="#3d2b00"
          color3="#000000"
          timeSpeed={0.275}
          zoom={0.9}
        />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen text-text-primary">
        <Header />

        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
