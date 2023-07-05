import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={twMerge(
          "flex",
          "w-full",
          "px-3 py-3",
          "rounded-md",
          "bg-neutral-700 file:bg-transparent", // file: means when type="file" inside html attributes
          "border file:border-0 border-transparent",
          "text-sm file:text-sm file:font-medium",
          "placeholder:text-neutral-400",
          "disabled:cursor-not-allowed",
          "disabled:opacity-50",
          "focus:outline-none",
          className
        )}
        type={type}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
export default Input;
