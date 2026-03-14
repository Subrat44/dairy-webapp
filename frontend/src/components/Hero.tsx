function Hero() {
  return (
    <section className="bg-gradient-to-r from-green-50 to-white py-24">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-12 px-6">

        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Fresh Dairy
            <span className="text-green-600"> Delivered Daily</span>
          </h1>

          <p className="text-gray-600 text-lg">
            Farm-fresh milk, paneer, butter and ghee delivered directly
            to your doorstep.
          </p>

          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>

        <img
          src="/src/assets/milk.jpg"
          className="rounded-2xl shadow-xl"
        />

      </div>
    </section>
  );
}

export default Hero;