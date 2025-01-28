import { useState, useEffect } from "react";
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

interface SearchResponse {
  consultations: Consultation[];
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center w-full py-8">
    <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
  </div>
);

const useConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConsultations = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://yxoq0fmgsj.execute-api.eu-west-2.amazonaws.com/api/consultations/search",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: {} }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SearchResponse = await response.json();
      setConsultations(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, []);

  return {
    consultations,
    isLoading,
    error,
    refetch: fetchConsultations,
    LoadingSpinner,
  };
};

export default useConsultations;
