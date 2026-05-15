import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import LogoSrc from "../../assets/Butta-logo-transparent.png";
import CartIcon from "../../assets/material-symbols_shopping-cart-rounded.svg";

export function Header() {
  const navigate = useNavigate();
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-black/55 backdrop-blur-2xl">
      <div className="flex items-center justify-between px-4 py-4 mx-auto max-w-7xl">
        <h1 className="m-0">
          <Link to="/" aria-label="Home">
            <img
              src={LogoSrc}
              alt="Mr. Fantastic's Online Emporium"
              className="h-10"
            />
          </Link>
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
            className="app-button px-3 py-2 text-sm inline-flex items-center gap-2"
            aria-label="View cart"
          >
            <img src={CartIcon} alt="Cart" className="h-5 w-5" />
            <span className="text-sm">
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
