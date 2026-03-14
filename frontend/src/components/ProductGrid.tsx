import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

function ProductGrid() {
  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6 py-12">

      {products.map((p, index) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <ProductCard {...p} />
        </motion.div>
      ))}

    </div>
  );
}

export default ProductGrid;