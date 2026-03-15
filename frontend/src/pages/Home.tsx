import { useState, useEffect, useRef } from "react";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

const trustItems = [
  { icon: "🛡️", label: "100% Pure & Natural" },
  { icon: "⏱️", label: "Same Day Delivery" },
  { icon: "🏡", label: "Direct from Farms" },
  { icon: "✅", label: "No Preservatives" },
];

const whyItems = [
  { icon: "🌿", title: "Farm to Doorstep", desc: "Partnered with 50+ local farms. Fresh produce delivered within hours of collection." },
  { icon: "🧪", title: "Quality Tested", desc: "Every batch is FSSAI certified and undergoes rigorous quality checks." },
  { icon: "🚴", title: "Express Delivery", desc: "Order by 9 PM — get your dairy delivered fresh by 7 AM next morning." },
  { icon: "♻️", title: "Eco Packaging", desc: "Biodegradable packaging and returnable glass bottles." },
];

const slides = [
  { tag: "Farm Fresh · Same Day Delivery", headline: ["Fresh Dairy", "Delivered Daily"], accentLine: 1, sub: "Pure milk, paneer, butter & ghee from local farms — at your doorstep by 7 AM.", cta: "Shop Now", emoji: "🥛", badge: "0% Preservatives", bg: "from-emerald-50 via-green-50 to-white" },
  { tag: "New Arrival · Organic Range", headline: ["Organic Ghee,", "Pure & Golden"], accentLine: 0, sub: "Hand-churned A2 cow ghee. Rich in nutrients, full of flavour.", cta: "Explore Ghee", emoji: "🫙", badge: "A2 Certified", bg: "from-amber-50 via-yellow-50 to-white" },
  { tag: "Bestseller · Morning Fresh", headline: ["Soft Paneer,", "Every Morning"], accentLine: 0, sub: "Made fresh overnight from full-cream milk. Perfect for your kitchen.", cta: "Order Paneer", emoji: "🧀", badge: "Made Fresh Daily", bg: "from-sky-50 via-blue-50 to-white" },
];

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("is-visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useFadeIn();
  return <div ref={ref} className={`fade-section ${className}`}>{children}</div>;
}

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | undefined>();

  useEffect(() => {
    const t = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => { setActiveSlide((a) => (a + 1) % slides.length); setTransitioning(false); }, 400);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const goTo = (i: number) => {
    if (i === activeSlide) return;
    setTransitioning(true);
    setTimeout(() => { setActiveSlide(i); setTransitioning(false); }, 400);
  };

  const s = slides[activeSlide];

  return (
    <>
      <style>{`
        .fade-section { opacity: 0; transform: translateY(32px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade-section.is-visible { opacity: 1; transform: translateY(0); }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
      `}</style>

      <main className="bg-gray-50 min-h-screen">

        {/* HERO */}
        <section className={`relative bg-gradient-to-br ${s.bg} transition-all duration-700 overflow-hidden flex items-center`}>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-emerald-100/30 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-emerald-50/50 blur-2xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid md:grid-cols-2 gap-12 items-center py-14 md:py-16">
            <div className={`transition-all duration-500 ${transitioning ? "opacity-0 translate-y-6" : "opacity-100 translate-y-0"}`}>
              <span className="inline-flex items-center gap-2 bg-white border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-full shadow-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {s.tag}
              </span>
              <h1 className="font-extrabold text-5xl md:text-6xl xl:text-7xl leading-[1.08] text-gray-900 mb-5">
                {s.headline.map((line, i) => (
                  <span key={i} className="block">
                    {i === s.accentLine ? <span className="text-emerald-600">{line}</span> : line}
                  </span>
                ))}
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">{s.sub}</p>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-200 active:scale-95"
                >
                  {s.cta} →
                </button>
                <button
                  onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
                  className="border-2 border-emerald-600 text-emerald-700 font-semibold px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all"
                >
                  About Us
                </button>
              </div>
              <div className="flex gap-8 pt-6 border-t border-gray-100">
                {[{ n: "15K+", l: "Customers" }, { n: "4.9★", l: "Rating" }, { n: "50+", l: "Products" }].map((stat) => (
                  <div key={stat.l}>
                    <div className="text-2xl font-extrabold text-gray-900">{stat.n}</div>
                    <div className="text-xs text-gray-400 font-medium">{stat.l}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`flex justify-center transition-all duration-500 ${transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
              <div className="relative bg-white rounded-3xl shadow-2xl shadow-emerald-100 flex items-center justify-center w-80 h-80 md:w-96 md:h-96">
                <span className="text-9xl select-none">{s.emoji}</span>
                <div className="absolute bottom-6 left-6 bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg shadow">
                  ✓ {s.badge}
                </div>
                <div className="absolute -top-4 -right-4 bg-amber-400 text-amber-900 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md rotate-6 animate-bounce">
                  FRESH TODAY
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === activeSlide ? "w-8 bg-emerald-600" : "w-2 bg-emerald-300 hover:bg-emerald-400"}`}
              />
            ))}
          </div>
        </section>

        {/* TRUST BAR */}
        <div className="bg-gray-900 py-3.5 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 md:gap-12">
            {trustItems.map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-gray-300 text-sm font-medium">
                <span>{item.icon}</span>{item.label}
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORIES */}
        <FadeSection>
          <CategorySection
            onSelect={(cat) => {
              setActiveCategory(cat);
              document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </FadeSection>

        {/* PRODUCTS */}
        <FadeSection>
          <ProductGrid />
        </FadeSection>

        {/* WHY US */}
        <FadeSection>
          <section className="bg-emerald-50 py-16 px-6 md:px-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-3">Why DairyHub</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">We put freshness first</h2>
                <p className="text-gray-400 mt-2">Everything we do is built around pure, natural dairy</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {whyItems.map((item, i) => (
                  <FadeSection key={item.title} className={`stagger-${i + 1}`}>
                    <div className="bg-white rounded-2xl p-6 border border-emerald-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
                      <div className="text-3xl mb-4">{item.icon}</div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeSection>
                ))}
              </div>
            </div>
          </section>
        </FadeSection>

        {/* ABOUT */}
        <FadeSection>
          <section id="about" className="py-20 px-6 md:px-10 bg-white">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-14 items-center">
              <div>
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">About DairyHub</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                  Born from a love of <span className="text-emerald-600">pure dairy</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-4">
                  DairyHub started in 2022 when our founders — two dairy farm kids from Karnataka — noticed that city families were stuck with processed, additive-laden dairy. We set out to fix that.
                </p>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Today we partner with 50+ local farms across Bengaluru, Mysuru and Tumkur to bring you milk, paneer, butter and ghee that is collected fresh, tested, and delivered within hours — no cold-chain shortcuts.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {[{ n: "50+", l: "Farm Partners" }, { n: "15K+", l: "Families Served" }, { n: "3+", l: "Years Running" }].map((s) => (
                    <div key={s.l} className="bg-emerald-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-extrabold text-emerald-700">{s.n}</div>
                      <div className="text-xs text-gray-400 mt-1">{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { emoji: "🐄", title: "Grass-fed Cows", desc: "Our farm partners raise free-range, grass-fed cows for richer, more nutritious milk." },
                  { emoji: "🌅", title: "Morning Collection", desc: "Milk is collected at 4 AM and dispatched by 6 AM — fresher than any supermarket." },
                  { emoji: "🧫", title: "Lab Tested", desc: "Every batch tested for purity, fat content, and microbial safety before dispatch." },
                  { emoji: "🏘️", title: "Local First", desc: "We only partner with farms within 100km of your city to minimize transit time." },
                ].map((card) => (
                  <div key={card.title} className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all">
                    <div className="text-2xl mb-2">{card.emoji}</div>
                    <div className="font-bold text-gray-900 text-sm mb-1">{card.title}</div>
                    <div className="text-gray-400 text-xs leading-relaxed">{card.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeSection>

        {/* TESTIMONIALS */}
        <FadeSection>
          <section className="py-16 px-6 md:px-10 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10">
                <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-3">Reviews</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">What our customers say</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-5">
                {[
                  { name: "Priya Sharma", loc: "Koramangala", stars: 5, text: "The ghee is absolutely divine! You can taste the difference from supermarket brands. My family refuses to go back.", initial: "P" },
                  { name: "Rohan Nair", loc: "Indiranagar", stars: 5, text: "Delivery is always on time and the milk is so fresh. Love the glass bottle option — feels premium and sustainable.", initial: "R" },
                  { name: "Ananya Reddy", loc: "Whitefield", stars: 4, text: "The paneer is incredibly soft. I've started cooking paneer dishes every week now. Great service overall!", initial: "A" },
                ].map((t, i) => (
                  <FadeSection key={t.name} className={`stagger-${i + 1}`}>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full">
                      <div className="text-amber-400 text-sm mb-3">{"★".repeat(t.stars)}{"☆".repeat(5 - t.stars)}</div>
                      <p className="text-gray-500 text-sm leading-relaxed italic mb-5">"{t.text}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-extrabold flex items-center justify-center text-sm">{t.initial}</div>
                        <div>
                          <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                          <p className="text-gray-400 text-xs">{t.loc}, Bengaluru</p>
                        </div>
                      </div>
                    </div>
                  </FadeSection>
                ))}
              </div>
            </div>
          </section>
        </FadeSection>

        <Footer />
      </main>
    </>
  );
}