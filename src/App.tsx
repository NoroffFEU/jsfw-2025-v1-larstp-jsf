import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { useCart } from "./hooks/useCart";
import { ToastContainer } from "./components/ui/ToastContainer";

function App() {
  const { items } = useCart();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
            <h1 className="text-2xl font-bold">
              Mr. Fantastic's Online Emporium
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Cart: {items.reduce((total, item) => total + item.quantity, 0)}
            </p>
          </div>
        </header>

        {/* Main stuffs */}
        <main className="grow">
          <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/" element={<HomePage />} />
            {/* More routes will go here later i think */}
          </Routes>
        </main>

        {/* Footer? */}
        <footer className="mt-12 text-white bg-gray-800">
          <div className="px-4 py-8 mx-auto max-w-7xl">
            <p>&copy; 2026 Online Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
