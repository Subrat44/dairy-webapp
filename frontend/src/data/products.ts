export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  badge?: string;
  originalPrice?: number;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Full Cream Milk",
    description: "Rich, creamy milk from grass-fed cows. Tested fresh daily.",
    price: 35,
    unit: "500ml",
    category: "Milk",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&q=80",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Toned Milk",
    description: "Low-fat toned milk — perfect for health-conscious households.",
    price: 55,
    unit: "1L",
    category: "Milk",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&q=80",
  },
  {
    id: 3,
    name: "Organic Cow Ghee",
    description: "Hand-churned A2 cow ghee. Rich in nutrients, pure golden flavour.",
    price: 499,
    originalPrice: 599,
    unit: "500g",
    category: "Ghee",
    image: "https://images.unsplash.com/photo-1630450202872-e0829c9d6172?w=300&q=80",
    badge: "Organic",
  },
  {
    id: 4,
    name: "Desi Ghee",
    description: "Traditional desi ghee prepared using the bilona method.",
    price: 279,
    unit: "250g",
    category: "Ghee",
    image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=300&q=80",
  },
  {
    id: 5,
    name: "White Butter",
    description: "Unsalted, creamy butter made fresh from whole milk every morning.",
    price: 120,
    unit: "200g",
    category: "Butter",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&q=80",
    badge: "Fresh Daily",
  },
  {
    id: 6,
    name: "Salted Butter",
    description: "Lightly salted, spreadable butter for toast and baking.",
    price: 75,
    unit: "100g",
    category: "Butter",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&q=80",
  },
  {
    id: 7,
    name: "Fresh Paneer",
    description: "Soft, moist paneer made from full-cream milk — zero additives.",
    price: 90,
    unit: "200g",
    category: "Paneer",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&q=80",
    badge: "Made Today",
  },
  {
    id: 8,
    name: "Malai Paneer",
    description: "Extra-rich malai paneer for curries, tikkas and desserts.",
    price: 199,
    originalPrice: 220,
    unit: "500g",
    category: "Paneer",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&q=80",
  },
];