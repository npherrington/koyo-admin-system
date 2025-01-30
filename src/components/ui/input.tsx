import * as React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const { isDarkMode } = useTheme();

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          isDarkMode
            ? "border-slate-700 bg-slate-800 text-white placeholder:text-slate-400 focus-visible:ring-orange-600 file:text-slate-200"
            : "border-slate-200 bg-white text-slate-950 placeholder:text-slate-500 focus-visible:ring-orange-600 file:text-slate-950",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
