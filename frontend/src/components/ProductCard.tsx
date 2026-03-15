import { useState } from "react";
import { useCart } from "../context/CartContext";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cart, removeFromCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const cartItem = (cart as any[]).find((c: any) => c.id === product.id);
  const qty = cartItem?.qty ?? 0;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  // Fallback emoji map if image fails to load
  const fallbackEmoji: Record<string, string> = {
    Milk: "🥛", Ghee: "🫙", Butter: "🧈", Paneer: "🧀",
  };

  return (
    <div className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-emerald-50 hover:-translate-y-1 transition-all duration-200">
      {/* Image area */}
      <div className="relative bg-gradient-to-br from-gray-50 to-emerald-50/30 h-44 flex items-center justify-center overflow-hidden">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.name}
            onError={() => setImgError(true)}
            className="h-36 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <span className="text-7xl group-hover:scale-110 transition-transform duration-300 select-none">
            {fallbackEmoji[product.category] ?? "🥛"}
          </span>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="bg-amber-400 text-amber-900 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
              -{discount}%
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-bold text-gray-900 text-base leading-tight mb-1">
          {product.name}
        </h3>
        <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-extrabold text-gray-900">₹{product.price}</span>
            <span className="text-xs text-gray-400 ml-1">/ {product.unit}</span>
            {product.originalPrice && (
              <span className="text-xs text-gray-300 line-through ml-2">₹{product.originalPrice}</span>
            )}
          </div>

          {qty === 0 ? (
            <button
              onClick={() => addToCart({ ...product, qty: 1 })}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-90 hover:shadow-lg hover:shadow-emerald-200"
            >
              +
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => removeFromCart(product.id)}
                className="w-8 h-8 rounded-lg border-2 border-emerald-200 text-emerald-700 font-bold hover:border-emerald-400 transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="font-extrabold text-emerald-700 text-sm w-5 text-center">{qty}</span>
              <button
                onClick={() => addToCart({ ...product, qty: 1 })}
                className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}