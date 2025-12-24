import type { ComponentPropsWithoutRef } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export interface IconButtonProps extends ComponentPropsWithoutRef<"button"> {
  size?: "sm" | "md" | "lg";
}

export const IconButton = ({
  className = "",
  size = "md",
  children,
  ...props
}: IconButtonProps) => {
  const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:pointer-events-none disabled:cursor-default border-none ",
    {
      variants: {
        size: {
          sm: "h-8 w-8",
          md: "h-10 w-10",
          lg: "h-12 w-12",
        },
      },
      defaultVariants: {
        size: "md",
      },
    }
  );

  return (
    <button className={cn(buttonVariants({ size, className }))} {...props}>
      {children}
    </button>
  );
};
