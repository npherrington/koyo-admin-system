import * as React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

interface ColourCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray";
  children: React.ReactNode;
}

const variantStyles = {
  blue: {
    light: {
      card: "bg-blue-100 border-blue-200",
      title: "text-blue-900",
      description: "text-blue-600",
      content: "text-blue-800",
    },
    dark: {
      card: "bg-blue-600 border-blue-400",
      title: "text-white-100",
      description: "text-blue-100",
      content: "text-white-100",
    },
  },
  green: {
    light: {
      card: "bg-green-100 border-green-200",
      title: "text-green-900",
      description: "text-green-600",
      content: "text-green-800",
    },
    dark: {
      card: "bg-green-600 border-green-200",
      title: "text-white-100",
      description: "text-green-300",
      content: "text-white-100",
    },
  },
  red: {
    light: {
      card: "bg-red-100 border-red-200",
      title: "text-red-900",
      description: "text-red-600",
      content: "text-red-800",
    },
    dark: {
      card: "bg-red-600 border-red-200",
      title: "text-white-100",
      description: "text-red-300",
      content: "text-white-100",
    },
  },
  yellow: {
    light: {
      card: "bg-yellow-100 border-yellow-200",
      title: "text-yellow-900",
      description: "text-yellow-600",
      content: "text-yellow-800",
    },
    dark: {
      card: "bg-yellow-200 border-yellow-100",
      title: "text-gray-600",
      description: "text-yellow-300",
      content: "text-gray-600",
    },
  },
  purple: {
    light: {
      card: "bg-purple-100 border-purple-200",
      title: "text-purple-900",
      description: "text-purple-600",
      content: "text-purple-800",
    },
    dark: {
      card: "bg-purple-200 border-purple-100",
      title: "text-gray-600",
      description: "text-purple-300",
      content: "text-gray-600",
    },
  },
  orange: {
    light: {
      card: "bg-orange-100 border-orange-200",
      title: "text-orange-900",
      description: "text-orange-600",
      content: "text-orange-800",
    },
    dark: {
      card: "bg-orange-400 border-orange-200",
      title: "text-white-100",
      description: "text-orange-300",
      content: "text-white-100",
    },
  },
  gray: {
    light: {
      card: "bg-gray-100 border-gray-200",
      title: "text-gray-900",
      description: "text-gray-600",
      content: "text-gray-800",
    },
    dark: {
      card: "bg-gray-600 border-gray-200",
      title: "text-white-100",
      description: "text-gray-300",
      content: "text-gray-200",
    },
  },
};

const ColourCard = React.forwardRef<HTMLDivElement, ColourCardProps>(
  ({ className, variant = "blue", children, ...props }, ref) => {
    const { isDarkMode } = useTheme();
    const styles = variantStyles[variant][isDarkMode ? "dark" : "light"];

    return (
      <div
        ref={ref}
        className={cn("rounded-lg border shadow-sm", styles.card, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
ColourCard.displayName = "ColourCard";

const ColourCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: ColourCardProps["variant"];
  }
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
ColourCardHeader.displayName = "ColourCardHeader";

const ColourCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: ColourCardProps["variant"];
  }
>(({ className, variant = "blue", ...props }, ref) => {
  const { isDarkMode } = useTheme();
  const styles = variantStyles[variant][isDarkMode ? "dark" : "light"];

  return (
    <div
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        styles.title,
        className
      )}
      {...props}
    />
  );
});
ColourCardTitle.displayName = "ColourCardTitle";

const ColourCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: ColourCardProps["variant"];
  }
>(({ className, variant = "blue", ...props }, ref) => {
  const { isDarkMode } = useTheme();
  const styles = variantStyles[variant][isDarkMode ? "dark" : "light"];

  return (
    <div
      ref={ref}
      className={cn("text-sm", styles.description, className)}
      {...props}
    />
  );
});
ColourCardDescription.displayName = "ColourCardDescription";

const ColourCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: ColourCardProps["variant"];
  }
>(({ className, variant = "blue", ...props }, ref) => {
  const { isDarkMode } = useTheme();
  const styles = variantStyles[variant][isDarkMode ? "dark" : "light"];

  return (
    <div
      ref={ref}
      className={cn("p-6 pt-0", styles.content, className)}
      {...props}
    />
  );
});
ColourCardContent.displayName = "ColourCardContent";

const ColourCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: ColourCardProps["variant"];
  }
>(({ className, variant = "blue", ...props }, ref) => {
  const { isDarkMode } = useTheme();
  const styles = variantStyles[variant][isDarkMode ? "dark" : "light"];

  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", styles.content, className)}
      {...props}
    />
  );
});
ColourCardFooter.displayName = "ColourCardFooter";

export {
  ColourCard,
  ColourCardHeader,
  ColourCardFooter,
  ColourCardTitle,
  ColourCardDescription,
  ColourCardContent,
};
