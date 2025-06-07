// src/components/MyForm.tsx
import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ReCaptcha: React.FC = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please verify that you're not a robot.");
      return;
    }

    // Send captchaValue along with form data to the server
    console.log("Captcha Verified:", captchaValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="John Benjie" required />
      <ReCAPTCHA
        sitekey="6Lees1YrAAAAAIWO1Al1HjT7-d3-Rgvw6pX_-gfF"
        onChange={(value) => setCaptchaValue(value)}
        ref={recaptchaRef}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReCaptcha;
