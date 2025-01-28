import * as React from "react";
import { Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface AdvancedSearchButtonProps {
  className?: string;
  containerClassName?: string;
  onSearch?: (searchParams: {
    consultationId: string;
    doctorId: string;
    patientId: string;
    phoneNumber: string;
  }) => void;
}

const AdvancedSearchButton = ({
  className,
  containerClassName,
  onSearch,
}: AdvancedSearchButtonProps) => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState({
    consultationId: "",
    doctorId: "",
    patientId: "",
    phoneNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchParams);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", containerClassName)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center px-4 py-2 rounded-lg transition-colors",
          "bg-white border border-slate-200 hover:bg-gray-50",
          "focus:outline-none focus:ring-2 focus:ring-orange-500",
          isDarkMode &&
            "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white",
          className
        )}
      >
        <Search className="h-4 w-4 mr-2 text-orange-500" />
        Search Consultations
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 z-50">
          <Card
            className={cn(
              "p-4 shadow-lg",
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  className={cn(
                    "block text-sm font-medium",
                    isDarkMode ? "text-white" : "text-gray-700"
                  )}
                >
                  Consultation ID
                </label>
                <input
                  type="text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500",
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-gray-300"
                  )}
                  value={searchParams.consultationId}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      consultationId: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label
                  className={cn(
                    "block text-sm font-medium",
                    isDarkMode ? "text-white" : "text-gray-700"
                  )}
                >
                  Doctor ID
                </label>
                <input
                  type="text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500",
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-gray-300"
                  )}
                  value={searchParams.doctorId}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      doctorId: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label
                  className={cn(
                    "block text-sm font-medium",
                    isDarkMode ? "text-white" : "text-gray-700"
                  )}
                >
                  Patient ID
                </label>
                <input
                  type="text"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500",
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-gray-300"
                  )}
                  value={searchParams.patientId}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      patientId: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <label
                  className={cn(
                    "block text-sm font-medium",
                    isDarkMode ? "text-white" : "text-gray-700"
                  )}
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500",
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-white"
                      : "bg-white border-gray-300"
                  )}
                  value={searchParams.phoneNumber}
                  onChange={(e) =>
                    setSearchParams((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "px-4 py-2 rounded-md border",
                    isDarkMode
                      ? "border-slate-600 text-white hover:bg-slate-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                >
                  Search
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};

export { AdvancedSearchButton };
