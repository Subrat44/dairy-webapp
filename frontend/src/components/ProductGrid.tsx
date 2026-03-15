import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { api } from "../services/api";

const CATEGORIES = ["All", "Milk", "Paneer", "Butter", "Ghee"];

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getProducts()
      .then(setProducts)
      .catch(() => setError("Could not load products."))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "All"
      ? products
      : products.filter((p: any) => p.category === filter);

  return (
    <section id="products" className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-3">
          Our Selection
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          Fresh Dairy Products
        </h2>
        <p className="text-gray-400 mt-2">
          Sourced from local farms, delivered fresh every morning
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
              filter === cat
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-white text-gray-500 border-gray-200 hover:border-emerald-300 hover:text-emerald-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-64 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-16 text-red-400">
          <span className="text-4xl block mb-3">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product: any) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-300">
          <span className="text-5xl block mb-3">🔍</span>
          <p>No products in this category</p>
        </div>
      )}
    </section>
  );
}