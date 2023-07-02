import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={twMerge(
          "w-full",
          "px-3 py-3",
          "rounded-full",
          "bg-green-500",
          // "border border-transparent",
          "text-black font-bold",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "hover:opacity-75",
          "transition",
          className
        )}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
