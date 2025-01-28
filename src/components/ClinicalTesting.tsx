import React, { useEffect, useState } from "react";
import { Download, CircleCheck, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Sidebar from "./ui/side-bar";
import { useTheme } from "@/contexts/ThemeContext";
import { AdvancedSearchButton } from "@/components/ui/advanced-search-results";
import useConsultations from "@/hooks/useConsultations";
import Pagination from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 5;

const ClinicalTesting = () => {
  const { isDarkMode } = useTheme();
  const { consultations, isLoading, error, fetchConsultations } =
    useConsultations();

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate current page's consultations
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentConsultations = consultations.slice(startIndex, endIndex);

  // const handleSearch = (query: Record<string, any>) => {
  //   fetchConsultations(query);
  // };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Sidebar activeSection="Clinical Testing" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Clinical Testing</h1>
          <p>Review completed consultation</p>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b">
          <span className="font-bold text-xl">Consultations</span>
        </CardHeader>

        <CardContent className="p-0">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <AdvancedSearchButton />
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              <Download className="w-4 h-4 mr-2" />
              {"<export report>"}
            </button>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">Error: {error.message}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Retry
              </button>
            </div>
          ) : consultations.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No consultations found
            </div>
          ) : (
            <div className="divide-y px-3 py-3 space-y-2">
              {currentConsultations.map((consultation) => (
                <Card key={consultation.id} className="p-3 hover:bg-orange-500">
                  <div className="flex justify-between items-start px-2 py-2">
                    <div>
                      <h3 className="font-medium">
                        Consultation ID: {consultation.id}
                      </h3>
                      <h3 className="font-medium">
                        Patient ID: {consultation.patient_id}
                      </h3>
                      <p className="text-sm">
                        Created:{" "}
                        {new Date(consultation.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-sm">
                        Ended:{" "}
                        {new Date(consultation.ended_at).toLocaleDateString()}
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
                          ? "<some_conclusion>"
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
              ))}
            </div>
          )}{" "}
        </CardContent>
        <CardFooter className="p-0 w-full">
          <div className="w-full px-6 py-4 flex items-center justify-between border-t">
            <Pagination
              items={consultations}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClinicalTesting;
