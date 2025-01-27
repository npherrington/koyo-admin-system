import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { CircleCheck } from "lucide-react";

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

interface SearchError {
  message: string;
  status: number;
}

const ConsultationSearch: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<SearchError | null>(null);

  const searchConsultations = async () => {
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
      setError({
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        status: err instanceof Error ? 500 : 500,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    searchConsultations();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-4">Error: {error.message}</p>
        <button
          onClick={searchConsultations}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {consultations && consultations.length > 0 ? (
        consultations.map((consultation) => (
          <Card key={consultation.id} className="p-3 hover:bg-orange-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">
                  Patient ID: {consultation.patient_id}
                </h3>
                <p className="text-sm">
                  Created:{" "}
                  {new Date(consultation.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  Ended: {new Date(consultation.ended_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-2 py-0 rounded text-sm ${
                    consultation.conclusion === null
                      ? "bg-yellow-100 text-yellow-800"
                      : consultation.conclusion
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {consultation.conclusion === null
                    ? "Pending"
                    : consultation.conclusion
                    ? "Approved"
                    : "Rejected"}
                </span>
                <div className="flex items-center">
                  <CircleCheck className="w-4 h-4 text-green-500 mr-1" />
                  <span>{"<some_score>"}</span>
                </div>
                <div className="flex items-center">
                  <span>{"<some_comment>"}</span>
                </div>
              </div>
            </div>
          </Card>
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          No consultations found
        </div>
      )}
    </div>
  );
};

export default ConsultationSearch;
