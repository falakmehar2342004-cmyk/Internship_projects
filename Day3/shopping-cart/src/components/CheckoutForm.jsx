
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  address: z.string().trim().min(5, "Enter a complete delivery address"),
});

export default function CheckoutForm({ onCheckout }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
  });

  const submitOrder = async (data) => {
    await onCheckout(data);
    setOrderPlaced(true);
    reset();
  };

  if (orderPlaced) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-950"
      >
        <div className="text-4xl">✓</div>
        <h2 className="mt-3 text-xl font-bold text-green-700 dark:text-green-300">
          Order Confirmed!
        </h2>
        <p className="mt-2 text-sm text-green-800 dark:text-green-200">
          Your demo order has been placed successfully.
        </p>
      </div>
    );
  }

  const inputClass =
    "mt-1 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white";

  return (
    <form
      onSubmit={handleSubmit(submitOrder)}
      className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        Checkout Details
      </h2>

      <div>
        <label className="text-sm font-medium dark:text-gray-200">
          Full Name
        </label>
        <input
          {...register("name")}
          className={inputClass}
          placeholder="Enter your name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium dark:text-gray-200">
          Email Address
        </label>
        <input
          {...register("email")}
          type="email"
          className={inputClass}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium dark:text-gray-200">
          Delivery Address
        </label>
        <textarea
          {...register("address")}
          rows={3}
          className={inputClass}
          placeholder="Enter delivery address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">
            {errors.address.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Processing..." : "Place Demo Order"}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400">
        Demo checkout only. No real payment is processed.
      </p>
    </form>
  );
}
