import type { ComponentPropsWithoutRef } from "react";

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: "sm" | "md" | "lg";
}

export const IconButton = ({
  className = "",
  size = "md",
  children,
  ...props
}: IconButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-none";

  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };

  const buttonClassName = `${baseStyles} ${sizeClasses[size]} ${className}`;

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
};
