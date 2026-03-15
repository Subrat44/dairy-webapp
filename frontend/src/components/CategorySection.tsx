const categories = [
  {
    name: "Milk",
    desc: "Farm-fresh, tested daily",
    emoji: "🥛",
    color: "from-sky-50 to-sky-100",
    border: "border-sky-200",
    text: "text-sky-700",
    count: "6 Products",
  },
  {
    name: "Paneer",
    desc: "Soft, made every morning",
    emoji: "🧀",
    color: "from-amber-50 to-amber-100",
    border: "border-amber-200",
    text: "text-amber-700",
    count: "4 Products",
  },
  {
    name: "Butter",
    desc: "Creamy, zero additives",
    emoji: "🧈",
    color: "from-yellow-50 to-yellow-100",
    border: "border-yellow-200",
    text: "text-yellow-700",
    count: "3 Products",
  },
  {
    name: "Ghee",
    desc: "Hand-churned A2 goodness",
    emoji: "🫙",
    color: "from-orange-50 to-orange-100",
    border: "border-orange-200",
    text: "text-orange-700",
    count: "5 Products",
  },
];

interface CategorySectionProps {
  onSelect?: (category: string) => void;
}

export default function CategorySection({ onSelect }: CategorySectionProps) {
  return (
    <section className="py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-3">
          Shop by Category
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          What are you looking for?
        </h2>
        <p className="text-gray-400 mt-2 text-base">
          All dairy, sourced fresh from local farms
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onSelect?.(cat.name)}
            className={`group bg-gradient-to-br ${cat.color} border ${cat.border} rounded-2xl p-6 flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:scale-95 cursor-pointer text-left`}
          >
            <span className="text-5xl group-hover:scale-110 transition-transform duration-200">
              {cat.emoji}
            </span>
            <div className="text-center">
              <div className={`font-extrabold text-lg ${cat.text}`}>
                {cat.name}
              </div>
              <div className="text-gray-400 text-xs mt-0.5">{cat.desc}</div>
              <div className={`text-xs font-bold mt-2 ${cat.text} opacity-70`}>
                {cat.count}
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}