import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-green-600">
          DairyHub
        </h1>

        <div className="flex items-center gap-6">

          <Link to="/" className="hover:text-green-600">
            Home
          </Link>

          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />

            <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 rounded-full">
              {cart.length}
            </span>

          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;