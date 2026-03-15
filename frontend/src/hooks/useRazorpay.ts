import { useEffect } from "react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Load Razorpay script once on app mount
export function useRazorpayScript() {
  useEffect(() => {
    if (document.getElementById("razorpay-script")) return;
    const script = document.createElement("script");
    script.id = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.getElementById("razorpay-script")?.remove();
    };
  }, []);
}

interface RazorpayOptions {
  amount: number;        // in ₹ (hook converts to paise)
  name?: string;
  description?: string;
  prefill?: { name?: string; email?: string; contact?: string };
  onSuccess: (paymentId: string) => void;
  onFailure?: (error: any) => void;
}

export function useRazorpayCheckout() {
  const openCheckout = ({
    amount,
    name = "DairyHub",
    description = "Fresh Dairy Order",
    prefill = {},
    onSuccess,
    onFailure,
  }: RazorpayOptions) => {
    if (!window.Razorpay) {
      console.error("Razorpay SDK not loaded.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount * 100,       // convert ₹ to paise
      currency: "INR",
      name,
      description,
      image: "/logo.png",         // your logo
      prefill,
      theme: { color: "#059669" },
      handler: (response: any) => {
        onSuccess(response.razorpay_payment_id);
      },
      modal: {
        ondismiss: () => {
          onFailure?.({ reason: "dismissed" });
        },
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", (response: any) => {
      console.error("Razorpay payment failed:", response.error);
      onFailure?.(response.error);
    });

    rzp.open();
  };

  return { openCheckout };
}