// components/ui/theme-toggle.tsx
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span>{isDarkMode ? <Moon /> : <Sun />}</span>
      <Switch
        checked={isDarkMode}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
    </div>
  );
};

export { ThemeToggle };
