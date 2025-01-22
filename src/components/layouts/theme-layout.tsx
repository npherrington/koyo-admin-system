// components/layout/theme-layout.tsx
import * as React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const ThemeLayout = ({ children, className }: ThemeLayoutProps) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={cn(
        "min-h-screen w-full transition-colors duration-200",
        isDarkMode ? "bg-slate-900 text-white" : "bg-white text-slate-900",
        className
      )}
    >
      {children}
    </div>
  );
};

export { ThemeLayout };
