import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="px-4 py-2 bg-blue-600 text-white rounded" {...props}>
      {children}
    </button>
  );
}
