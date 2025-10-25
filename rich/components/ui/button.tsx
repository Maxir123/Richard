// components/ui/button.tsx
"use client";

import React from "react";
import { cn } from "@/lib/utils"; // your classNames helper, optional
import type { ButtonHTMLAttributes, DetailedHTMLProps, ForwardedRef } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "default" | "ghost";
  size?: "sm" | "md" | "lg";
};

const buttonVariants = ({ variant = "default", size = "md" }: {variant?:string,size?:string}) => {
  const base = "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-colors focus:outline-none";
  const v = variant === "ghost" ? "bg-transparent hover:bg-white/5" : "bg-white text-blue-600";
  const s = size === "sm" ? "px-3 py-1 text-sm" : size === "lg" ? "px-6 py-3 text-lg" : "px-4 py-2 text-base";
  return `${base} ${v} ${s}`;
};

const Button = React.forwardRef(function Button(
  { children, className, variant, size, ...props }: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>
) {
  // Render exactly the same structure server & client; avoid conditional children here.
  return (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className || "")}
      {...props}
      // Avoid adding attributes conditionally that differ between server and client
    >
      {children}
    </button>
  );
});

export default Button;
export { Button };
