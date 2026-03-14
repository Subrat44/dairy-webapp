import { useContext } from "react";
import { CartContext } from "../context/CartContext";

type Props = {
  id: number;
  name: string;
  price: number;
  image: string;
};

function ProductCard({ id, name, price, image }: Props) {
  const { addToCart } = useContext(CartContext);

  return (
   <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300">
      <img src={image} className="h-40 w-full object-cover rounded-lg" />

      <h3 className="mt-3 font-semibold">{name}</h3>

      <p className="text-green-600 font-bold">₹{price}</p>

      <button
        onClick={() => addToCart({ id, name, price })}
        className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg"
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;