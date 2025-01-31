import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";

// Types for the API response
interface Consultation {
  id: string;
  patient_id: string;
  conclusion: null | boolean;
  overall_score: null | number;
  comment: null | string;
  created_at: string;
  ended_at: string;
  deleted_at: null | string;
}

interface SearchParams {
  consultationId?: string;
  patientId?: string;
}

const getErrorMessage = (status: number, responseData: any = null): string => {
  // Check for specific ObjectId validation error
  if (status === 500 && responseData?.message?.includes("ObjectId")) {
    return "Invalid consultation ID format. Please enter a valid 24-character ID.";
  }

  switch (status) {
    case 400:
      return "Invalid request format. Please check your search criteria.";
    case 401:
      return "Unauthorized access. Please log in again.";
    case 403:
      return "You don't have permission to access this resource.";
    case 404:
      return "The consultation service is not available.";
    case 500:
      return "input is not a valid ObjectId, it must be a 12-byte input or a 24-character hex string";
    case 503:
      return "The service is temporarily unavailable. Please try again later.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

const LoadingSpinner = () => (
  <div className="flex justify-center items-center w-full py-8">
    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
  </div>
);

const useConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentSearchParams, setCurrentSearchParams] = useState<SearchParams>(
    {}
  );

  const fetchConsultations = useCallback(
    async (query: Record<string, any> = {}) => {
      setIsLoading(true);
      setError(null);

      console.log("Query received by hook:", query);
      try {
        const response = await fetch(
          "https://j6424zsdt9.execute-api.eu-west-2.amazonaws.com/api/consultations/search",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        if (!response.ok) {
          const errorMessage = getErrorMessage(response.status, query);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        setConsultations(data);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchConsultations();
  }, []);

  return {
    consultations,
    isLoading,
    error,
    fetchConsultations,
    LoadingSpinner,
  };
};

export default useConsultations;
