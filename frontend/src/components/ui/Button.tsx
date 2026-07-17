import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary hover:bg-primary-hover text-white",
  secondary: "bg-secondary hover:bg-secondary-hover text-stone-900",
  danger: "bg-danger hover:bg-danger-hover text-white",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = ({
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={`flex items-center gap-1 cursor-pointer rounded-lg p-2 focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    />
  );
};
