export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-14 pb-6 px-6 md:px-10 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-white font-extrabold text-2xl flex items-center gap-2 mb-3">
              <span>🥛</span> DairyHub
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Farm-fresh dairy products delivered to your door. Pure, natural,
              and always fresh — straight from the source.
            </p>
            <div className="flex gap-3 mt-5">
              {["📘", "📸", "🐦"].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-emerald-600 flex items-center justify-center text-sm transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Products
            </h4>
            <ul className="space-y-2 text-sm">
              {["Fresh Milk", "Organic Ghee", "White Butter", "Paneer", "Curd", "Buttermilk"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Our Farms", "Blog", "Careers", "Press"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">
              Support
            </h4>
            <ul className="space-y-2 text-sm">
              {["Track Order", "Returns", "FAQ", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-emerald-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-3 bg-gray-800 rounded-xl text-xs space-y-1">
              <p className="text-white font-semibold">📞 1800-000-DAIRY</p>
              <p className="text-gray-500">Mon–Sat, 7 AM – 9 PM</p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="border-t border-gray-800 pt-8 mb-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-600">
            {[
              "✅ FSSAI Certified",
              "🌿 100% Natural",
              "🚴 Same Day Delivery",
              "♻️ Eco Packaging",
              "🔒 Secure Payments",
            ].map((badge) => (
              <span key={badge} className="flex items-center gap-1.5">
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} DairyHub. All rights reserved.</span>
          <span>Made with 🥛 in Bengaluru</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}