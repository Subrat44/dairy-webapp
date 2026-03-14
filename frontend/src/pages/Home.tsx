import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductGrid from "../components/ProductGrid";

function Home() {
  return (
    <div className="bg-gray-50">

      <Navbar />

      <Hero />

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-10">
          Our Dairy Products
        </h2>

        <ProductGrid />
      </section>

    </div>
  );
}

export default Home;