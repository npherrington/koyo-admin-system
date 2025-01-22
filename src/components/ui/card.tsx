import * as React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border shadow-sm",
        isDarkMode
          ? "bg-slate-800 border-slate-700 text-white"
          : "bg-white border-slate-200 text-slate-950",
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col space-y-1.5 p-6",
        isDarkMode
          ? "bg-slate-800 border-slate-700 text-white"
          : "bg-slate-50 border-slate-200 text-slate-950",
        className
      )}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        isDarkMode ? "text-white" : "text-slate-950",
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      ref={ref}
      className={cn(
        "text-sm",
        isDarkMode ? "text-slate-400" : "text-slate-500",
        className
      )}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      ref={ref}
      className={cn(
        "p-6 pt-0",
        isDarkMode ? "bg-slate-700 text-blue-300/80" : "text-slate-950",
        className
      )}
      {...props}
    />
  );
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        isDarkMode ? "text-blue-300" : "bg-slate-50 text-slate-950",
        className
      )}
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
