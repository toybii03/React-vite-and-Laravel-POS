import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function Payment() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [amount, setAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [message, setMessage] = useState("");

  // Fetch products for selection
  useEffect(() => {
    fetch("http://localhost:8000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    const payload = {
      product_id: productId,
      amount,
      discount: discount || 0,
      email,
      payment_method: paymentMethod,
    };
    const res = await fetch("http://localhost:8000/api/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Payment successful! Receipt sent to email.");
      setProductId("");
      setAmount("");
      setDiscount("");
      setEmail("");
      setPaymentMethod("cash");
    } else {
      setMessage(data.error || "Payment failed.");
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
        <div className="mb-3">
          <label className="form-label">Product</label>
          <select
            className="form-select"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (₱{p.price})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={0}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Discount</label>
          <input
            type="number"
            className="form-control"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            min={0}
            placeholder="0"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Customer Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
          >
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="gcash">GCash</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Pay
        </button>
      </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
}
