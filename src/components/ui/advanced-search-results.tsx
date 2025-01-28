import * as React from "react";
import { Search } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import useConsultations from "@/hooks/useConsultations";

interface Consultation {
  id: string;
  conclusion: null | boolean;
  overall_score: null | number;
  comment: null | string;
  created_at: string;
  ended_at: string;
  deleted_at: null | string;
}

interface AdvancedSearchButtonProps {
  className?: string;
  containerClassName?: string;
}

const AdvancedSearchButton = ({
  className,
  containerClassName,
}: AdvancedSearchButtonProps) => {
  const { isDarkMode } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const [consultationId, setConsultationId] = React.useState("");
  const { consultations, isLoading, error, fetchConsultations } =
    useConsultations();
  const [searchPerformed, setSearchPerformed] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = {
      id: consultationId || "",
    };

    await fetchConsultations(query);
    setSearchPerformed(true);
  };

  interface ResultCardProps {
    consultation: Consultation;
  }

  const ResultCard = ({ consultation }: ResultCardProps) => (
    <div
      className={cn(
        "mt-4 p-3 rounded-lg border",
        isDarkMode
          ? "bg-slate-700 border-slate-600"
          : "bg-gray-50 border-gray-200"
      )}
    >
      <div className="space-y-2">
        <div className="flex justify-between">
          <span
            className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-white" : "text-gray-700"
            )}
          >
            ID: {consultation.id}
          </span>
          {consultation.overall_score !== null && (
            <span className="text-sm text-orange-600">
              Score: {consultation.overall_score}
            </span>
          )}
        </div>
        <div className="flex justify-between text-xs">
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            Created: {new Date(consultation.created_at).toLocaleDateString()}
          </span>
          <span
            className={cn(
              "px-2 py-0.5 rounded",
              consultation.conclusion
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {consultation.conclusion ? "Concluded" : "Open"}
          </span>
        </div>
      </div>
    </div>
  );

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
        <Search className="h-4 w-4 mr-2" />
        Search Consultation
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
                  placeholder="Enter consultation ID"
                  className={cn(
                    "w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500",
                    "placeholder:text-gray-400",
                    isDarkMode
                      ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-500"
                      : "bg-white border-gray-300"
                  )}
                  value={consultationId}
                  onChange={(e) => setConsultationId(e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setSearchPerformed(false);
                  }}
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

            {searchPerformed && (
              <div className="mt-6">
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : error ? (
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      isDarkMode
                        ? "bg-red-900/50 text-red-200"
                        : "bg-red-50 text-red-600"
                    )}
                  >
                    {error.message}
                  </div>
                ) : consultations.length === 0 ? (
                  <div
                    className={cn(
                      "text-center py-4",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}
                  >
                    No consultations found
                  </div>
                ) : (
                  <div className="space-y-2">
                    {consultations.map((consultation) => (
                      <ResultCard
                        key={consultation.id}
                        consultation={consultation}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export { AdvancedSearchButton };
