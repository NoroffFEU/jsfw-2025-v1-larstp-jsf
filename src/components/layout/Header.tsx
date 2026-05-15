import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

export function Header() {
  const navigate = useNavigate();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold text-teal-accent">
          Mr. Fantastic's Online Emporium
        </h1>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/contact")}
            className="app-button px-4 py-2 text-sm"
          >
            Contact
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="app-button px-4 py-2 text-sm"
          >
            Cart: {items.reduce((total, item) => total + item.quantity, 0)}
          </button>
        </div>
      </div>
    </header>
  );
}
