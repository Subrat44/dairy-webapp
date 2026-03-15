import { useEffect } from "react";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  // Derive quantities from cart array (assuming cart has qty field, or count occurrences)
  // Adjust based on your CartContext shape
  const items = cart; // expects: { id, name, price, emoji/image, qty }

  const total = items.reduce(
    (sum: number, item: any) => sum + item.price * (item.qty ?? 1),
    0
  );

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

 const handleCheckout = async () => {
  const orderData = {
    items: items.map((item: any) => ({
      product_id: item.id || item._id,
      name: item.name,
      price: item.price,
      quantity: item.qty ?? 1,
    })),
    total_amount: total,
    delivery_address: "123 Main St, Bengaluru", // we'll make this dynamic later
  };

  try {
    // Step 1 — Create order in backend
    const orderRes = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(orderData),
    });

    if (!orderRes.ok) throw new Error("Order creation failed");
    const order = await orderRes.json();

    // Step 2 — Open Razorpay
    if (!(window as any).Razorpay) {
      alert("Razorpay not loaded");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: total * 100,
      currency: "INR",
      name: "DairyHub",
      description: "Fresh Dairy Order",
      order_id: order.razorpay_order_id,
      handler: async (response: any) => {
        // Step 3 — Verify payment
        const verifyRes = await fetch(
          `${import.meta.env.VITE_API_URL}/api/payments/verify`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              order_id: order.id,
            }),
          }
        );

        if (verifyRes.ok) {
          alert("🎉 Order placed successfully!");
          clearCart();
          onClose();
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: { name: "Subrat", email: "kumarskp920@gmail.com" },
      theme: { color: "#059669" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (err) {
    alert("Something went wrong. Are you logged in?");
    console.error(err);
  }
};

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-extrabold text-gray-900">Your Cart</h2>
            <p className="text-xs text-gray-400">
              {items.length === 0
                ? "Nothing here yet"
                : `${items.reduce((s: number, i: any) => s + (i.qty ?? 1), 0)} items`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors text-xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <span className="text-6xl mb-4 opacity-30">🛒</span>
              <p className="text-gray-400 font-medium">Your cart is empty</p>
              <p className="text-gray-300 text-sm mt-1">
                Add some fresh dairy!
              </p>
              <button
                onClick={onClose}
                className="mt-6 text-emerald-600 font-semibold text-sm border border-emerald-200 px-5 py-2 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-3 bg-gray-50 rounded-2xl p-3 group"
              >
                {/* Image/Emoji */}
                <div className="w-14 h-14 bg-emerald-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                  {item.emoji ?? "🥛"}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm truncate">
                    {item.name}
                  </p>
                  <p className="text-emerald-700 font-bold text-sm">
                    ₹{item.price * (item.qty ?? 1)}
                  </p>
                </div>

                {/* Qty controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors text-base font-bold"
                  >
                    −
                  </button>
                  <span className="w-5 text-center font-bold text-sm text-gray-900">
                    {item.qty ?? 1}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white hover:bg-emerald-700 transition-colors text-base font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-5 space-y-4 bg-white">
            {/* Order summary */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span className="text-emerald-600 font-semibold">FREE</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-100"
            >
              Pay ₹{total} · Razorpay
            </button>

            <button
              onClick={() => { clearCart(); }}
              className="w-full text-center text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}