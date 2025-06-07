import React, { useState } from "react";

interface SurveyProps {
  paymentId: number;
}

export default function Survey({ paymentId }: SurveyProps) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:8000/api/surveys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ payment_id: paymentId, rating, comment }),
    });

    if (res.ok) {
      setMessage("✅ Thank you for your feedback!");
      setComment("");
      setRating(5);
    } else {
      setMessage("❌ Submission failed. Please try again.");
    }
  };

  return (
    <div
      className="container my-4 p-4 border rounded shadow-sm"
      style={{ maxWidth: 500 }}
    >
      <h5 className="mb-3">Customer Feedback</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Rate your experience:</label>
          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} -{" "}
                {["Poor", "Fair", "Good", "Very Good", "Excellent"][n - 1]}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Comments (optional):</label>
          <textarea
            className="form-control"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us more about your experience..."
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit Feedback
        </button>

        {message && (
          <div
            className="alert mt-3"
            role="alert"
            style={{ color: message.includes("Thank") ? "green" : "red" }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
