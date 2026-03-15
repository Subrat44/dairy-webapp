import { useEffect, useRef, useState } from "react";
const slides = [
  {
    tag: "Farm Fresh · Same Day Delivery",
    headline: ["Fresh Dairy", "Delivered Daily"],
    accent: 1,
    sub: "Pure milk, paneer, butter & ghee from local farms — at your doorstep by 7 AM.",
    cta: "Shop Now",
    bg: "from-emerald-50 to-white",
    emoji: "🥛",
    highlight: "0% Preservatives",
  },
  {
    tag: "New Arrival · Organic Range",
    headline: ["Organic Ghee,", "Pure & Golden"],
    accent: 0,
    sub: "Hand-churned A2 cow ghee. Rich in nutrients, full of flavour.",
    cta: "Explore Ghee",
    bg: "from-amber-50 to-white",
    emoji: "🫙",
    highlight: "A2 Certified",
  },
  {
    tag: "Bestseller · Morning Fresh",
    headline: ["Soft Paneer,", "Every Morning"],
    accent: 0,
    sub: "Made fresh overnight from full-cream milk. Perfect for your kitchen.",
    cta: "Order Paneer",
    bg: "from-sky-50 to-white",
    emoji: "🧀",
    highlight: "Made Fresh Daily",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (idx: number) => {
    if (animating || idx === active) return;
    setAnimating(true);
    setTimeout(() => {
      setActive(idx);
      setAnimating(false);
    }, 350);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
    }, 4500);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const s = slides[active];

  return (
    <section
      className={`relative min-h-[88vh] bg-gradient-to-br ${s.bg} transition-all duration-700 flex items-center overflow-hidden`}
    >
      {/* Background circles */}
      <div className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-emerald-50/60 blur-2xl pointer-events-none" />

     <div className="max-w-7xl mx-auto px-8 md:px-16 w-full grid md:grid-cols-2 gap-16 items-center py-20 md:py-28">
        {/* Text */}
        <div
          className={`transition-all duration-500 ${
            animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {s.tag}
          </span>

         <h1 className="font-extrabold text-6xl md:text-7xl xl:text-8xl leading-[1.08] text-gray-900 mb-6">
            {s.headline.map((line, i) => (
              <span key={i} className="block">
                {i === s.accent ? (
                  <span className="text-emerald-600">{line}</span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h1>

          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
            {s.sub}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-200 active:scale-95"
            >
              {s.cta}
            </button>
            <button className="border-2 border-emerald-600 text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all">
              Learn More
            </button>
          </div>

          <div className="flex gap-8 pt-6 border-t border-gray-100">
            {[
              { n: "15K+", l: "Customers" },
              { n: "4.9★", l: "Rating" },
              { n: "50+", l: "Products" },
            ].map((stat) => (
              <div key={stat.l}>
                <div className="text-2xl font-extrabold text-gray-900 leading-tight">
                  {stat.n}
                </div>
                <div className="text-xs text-gray-400 font-medium">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Product card */}
        <div
          className={`flex justify-center transition-all duration-500 ${
            animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="relative bg-white rounded-3xl shadow-2xl shadow-emerald-100 flex items-center justify-center w-96 h-96 md:w-[480px] md:h-[480px]">
            <span className="text-[10rem] select-none">{s.emoji}</span>
            <div className="absolute bottom-6 left-6 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg">
              ✓ {s.highlight}
            </div>
            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-900 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md rotate-6">
              FRESH TODAY
            </div>
          </div>
        </div>
      </div>

      {/* Slide dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? "w-8 bg-emerald-600"
                : "w-2 bg-emerald-300 hover:bg-emerald-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}