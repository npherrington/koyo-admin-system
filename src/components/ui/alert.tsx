import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";

type AlertVariantType =
  | "default"
  | "destructive"
  | "success"
  | "warning"
  | "info";

const getAlertVariants = (isDarkMode: boolean) =>
  cva(
    "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
    {
      variants: {
        variant: {
          default: cn(
            isDarkMode
              ? "bg-slate-800 border-slate-700 text-slate-200"
              : "bg-white border-slate-200 text-slate-900"
          ),
          destructive: cn(
            isDarkMode
              ? "bg-red-900/50 border-red-500/20 text-red-200"
              : "bg-red-50 border-red-200 text-red-900"
          ),
          success: cn(
            isDarkMode
              ? "bg-green-900/10 border-green-500/20 text-green-200"
              : "bg-green-50 border-green-200 text-green-900"
          ),
          warning: cn(
            isDarkMode
              ? "bg-yellow-900/10 border-yellow-500/20 text-yellow-200"
              : "bg-yellow-50 border-yellow-200 text-yellow-900"
          ),
          info: cn(
            isDarkMode
              ? "bg-blue-900/10 border-blue-500/20 text-blue-200"
              : "bg-blue-50 border-blue-200 text-blue-900"
          ),
        },
      },
      defaultVariants: {
        variant: "default",
      },
    }
  );

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Omit<VariantProps<ReturnType<typeof getAlertVariants>>, "variant"> {
  variant?: AlertVariantType;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const { isDarkMode } = useTheme();
    const alertVariants = getAlertVariants(isDarkMode);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AlertTitle = React.forwardRef<HTMLParagraphElement, AlertTitleProps>(
  ({ className, ...props }, ref) => {
    const { isDarkMode } = useTheme();

    return (
      <h5
        ref={ref}
        className={cn(
          "mb-1 font-medium leading-none tracking-tight",
          isDarkMode ? "text-slate-200" : "text-slate-900",
          className
        )}
        {...props}
      />
    );
  }
);
AlertTitle.displayName = "AlertTitle";

interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => {
  const { isDarkMode } = useTheme();

  return (
    <div
      ref={ref}
      className={cn(
        "text-sm [&_p]:leading-relaxed",
        isDarkMode ? "text-slate-300" : "text-slate-700",
        className
      )}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
export type { AlertProps, AlertTitleProps, AlertDescriptionProps };
