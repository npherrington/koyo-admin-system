import * as React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();

  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        isDarkMode
          ? [
              "bg-slate-800",
              "border-slate-700",
              "text-slate-200",
              "placeholder:text-slate-400",
              "focus-visible:ring-slate-400",
              "focus-visible:ring-offset-slate-900",
            ]
          : [
              "bg-white",
              "border-slate-200",
              "text-slate-900",
              "placeholder:text-slate-500",
              "focus-visible:ring-slate-500",
              "focus-visible:ring-offset-white",
            ],
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
