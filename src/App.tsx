import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { useCart } from "./hooks/useCart";

function App() {
  const { items } = useCart();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-bold">
              Mr. Fantastic's Online Emporium
            </h1>
            <p className="text-sm font-medium text-slate-600">
              Cart: {items.reduce((total, item) => total + item.quantity, 0)}
            </p>
          </div>
        </header>

        {/* Main stuffs */}
        <main className="flex-grow">
          <Routes>
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/" element={<HomePage />} />
            {/* More routes will go here later i think */}
          </Routes>
        </main>

        {/* Footer? */}
        <footer className="bg-gray-800 text-white mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <p>&copy; 2026 Online Shop. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
