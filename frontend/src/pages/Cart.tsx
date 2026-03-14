import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart, increaseQty, decreaseQty, getTotal } =
    useContext(CartContext);

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cart.map((item: any) => (
        <div
          key={item.id}
          className="flex justify-between items-center border-b py-4"
        >
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-500">₹{item.price}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => decreaseQty(item.id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              -
            </button>

            <span>{item.qty}</span>

            <button
              onClick={() => increaseQty(item.id)}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="mt-6 text-xl font-bold">
        Total: ₹{getTotal()}
      </div>

      <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg">
        Checkout
      </button>

    </div>
  );
}

export default Cart;