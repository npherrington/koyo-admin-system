import * as React from "react";
import { Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  className?: string;
  iconClassName?: string;
  containerClassName?: string;
  width?: string;
  iconColor?: string;
  hoverRingColor?: string;
  focusRingColor?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      iconClassName,
      containerClassName,
      width = "w-96",
      placeholder = "Search...",
      iconColor = "text-gray-400",
      hoverRingColor = "hover:ring-gray-200",
      focusRingColor = "focus:ring-orange-500",
      ...props
    },
    ref
  ) => {
    const { isDarkMode } = useTheme();

    return (
      <div className={cn("relative", containerClassName)}>
        <Search
          className={cn(
            "absolute left-3 top-2.5 h-4 w-4",
            iconColor,
            iconClassName
          )}
        />
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          className={cn(
            "pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 hover:ring-1 transition-shadow",
            width,
            focusRingColor,
            isDarkMode
              ? cn(
                  "bg-slate-800 text-white border-slate-700",
                  hoverRingColor || "hover:ring-slate-600"
                )
              : cn(
                  "bg-white text-black border-slate-200",
                  hoverRingColor || "hover:ring-gray-200"
                ),
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
