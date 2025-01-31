import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

const useButtonVariants = () => {
  const { isDarkMode } = useTheme();

  return cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    {
      variants: {
        variant: {
          default: cn(
            isDarkMode
              ? "bg-slate-600 text-slate-200 hover:bg-orange-600 hover:text-white focus-visible:ring-orange-600"
              : "bg-slate-100 text-slate-900 hover:bg-orange-600 hover:text-white focus-visible:ring-orange-600"
          ),
          destructive: cn(
            isDarkMode
              ? "bg-red-700 text-slate-50 hover:bg-red-600 focus-visible:ring-red-600"
              : "bg-red-500 text-slate-50 hover:bg-red-600 focus-visible:ring-red-500"
          ),
          outline: cn(
            isDarkMode
              ? "border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800 hover:text-slate-200 focus-visible:ring-slate-400"
              : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-950"
          ),
          secondary: cn(
            isDarkMode
              ? "bg-slate-700 text-slate-200 hover:bg-slate-600 focus-visible:ring-slate-400"
              : "bg-slate-100 text-slate-900 hover:bg-slate-200 focus-visible:ring-slate-950"
          ),
          ghost: cn(
            isDarkMode
              ? "text-slate-200 hover:bg-slate-800 hover:text-slate-200 focus-visible:ring-slate-400"
              : "text-slate-900 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-slate-950"
          ),
          link: cn(
            isDarkMode
              ? "text-slate-200 underline-offset-4 hover:underline focus-visible:ring-slate-400"
              : "text-slate-900 underline-offset-4 hover:underline focus-visible:ring-slate-950"
          ),
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10",
        },
      },
      defaultVariants: {
        variant: "default",
        size: "default",
      },
    }
  );
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<ReturnType<typeof useButtonVariants>> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const buttonVariants = useButtonVariants();

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, useButtonVariants as buttonVariants };
