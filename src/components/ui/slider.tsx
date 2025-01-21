import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track
        className={cn(
          "relative h-2 w-full grow overflow-hidden rounded-full",
          isDarkMode ? "bg-slate-700" : "bg-slate-200"
        )}
      >
        <SliderPrimitive.Range
          className={cn(
            "absolute h-full",
            isDarkMode ? "bg-orange-500" : "bg-orange-600"
          )}
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={cn(
          "block h-5 w-5 rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isDarkMode
            ? "border-orange-500 bg-slate-800 hover:bg-slate-700"
            : "border-orange-600 bg-white hover:bg-slate-50"
        )}
      />
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
