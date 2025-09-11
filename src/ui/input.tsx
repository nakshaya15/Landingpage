import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`w-full border rounded-md px-3 py-2 outline-none focus:ring focus:ring-indigo-500 ${className}`}
      {...props}
    />
  );
}
