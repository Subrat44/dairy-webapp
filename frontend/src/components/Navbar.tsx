import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cart } = useCart();
  const token = localStorage.getItem("token");
  const location = useLocation();

  const totalQty = (cart as any[]).reduce(
    (s: number, i: any) => s + (i.qty ?? 1),
    0
  );

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Products", to: "/#products" },
    { label: "About", to: "/about" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="text-emerald-600 font-extrabold text-2xl tracking-tight flex items-center gap-2"
          >
            <span className="text-2xl">🥛</span>
            DairyHub
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.to
                    ? "text-emerald-600"
                    : "text-gray-600 hover:text-emerald-600"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            
{token ? (
  <button
    onClick={() => { localStorage.removeItem("token"); window.location.reload(); }}
    className="text-sm font-medium text-gray-600 hover:text-red-500 transition-colors"
  >
    Logout
  </button>
) : (
  <a
    href="/login"
    className="text-sm font-semibold text-emerald-600 border border-emerald-200 px-4 py-2 rounded-xl hover:bg-emerald-50 transition-colors"
  >
    Login
  </a>
)}
            <button
              onClick={() => setDrawerOpen(true)}
              className="relative flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-semibold text-sm transition-all active:scale-95"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="hidden sm:inline">Cart</span>
              {totalQty > 0 && (
                <span className="bg-white text-emerald-700 font-extrabold text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalQty}
                </span>
              )}
            </button>

            {/* Mobile menu */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              onClick={() => setMobileOpen((o) => !o)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 px-6 py-3 space-y-1 bg-white">
            {navLinks.map((link) => (
              <a
                key={link.to}
                href={link.to}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-gray-600 hover:text-emerald-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}