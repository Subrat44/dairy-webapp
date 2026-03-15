const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = {
  async getProducts() {
    const res = await fetch(`${BASE_URL}/api/products/`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getProduct(id: string) {
    const res = await fetch(`${BASE_URL}/api/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },

  async createOrder(orderData: any, token: string) {
    const res = await fetch(`${BASE_URL}/api/orders/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw new Error("Failed to create order");
    return res.json();
  },

  async verifyPayment(paymentData: any) {
    const res = await fetch(`${BASE_URL}/api/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });
    if (!res.ok) throw new Error("Payment verification failed");
    return res.json();
  },
};