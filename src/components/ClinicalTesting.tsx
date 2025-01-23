import React, { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Star,
  Heart,
  CheckCircle,
  Square,
  CheckSquare,
  Download,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ColourCard,
  ColourCardHeader,
  ColourCardTitle,
  ColourCardContent,
} from "@/components/ui/colour-card";
import { useNavigate } from "react-router-dom";
import Sidebar from "./ui/side-bar";
import { useTheme } from "@/contexts/ThemeContext";
import { SearchInput } from "@/components/ui/search-input";

interface Consultation {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  duration: string;
  status: string;
  type: string;
  patientRating: number;
  empathyScore: number | null;
  qstarScore: number | null;
  summary: string;
  assigned?: boolean;
}

const ClinicalTesting = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("awaiting-review");
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const storedConsultations = localStorage.getItem("mockConsultations");

    if (storedConsultations) {
      // If data exists in localStorage, use it
      setConsultations(JSON.parse(storedConsultations));
    } else {
      // If no data in localStorage, fetch from JSON file
      fetch("../public/mockConsultations.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data: Consultation[]) => {
          // Initialize assigned property and store in localStorage
          const consultationsWithAssigned = data.map((consultation) => ({
            ...consultation,
            assigned: false,
          }));
          localStorage.setItem(
            "mockConsultations",
            JSON.stringify(consultationsWithAssigned)
          );
          setConsultations(consultationsWithAssigned);
        })
        .catch((error) => {
          console.error("Error loading the JSON file:", error);
        });
    }
  }, []);

  // Toggle assigned status
  const toggleAssigned = (id: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent consultation click handler from firing
    setConsultations((prevConsultations) =>
      prevConsultations.map((consultation) =>
        consultation.id === id
          ? { ...consultation, assigned: !consultation.assigned }
          : consultation
      )
    );
  };

  // Filter consultations based on selected tab
  const filteredConsultations = consultations.filter((consultation) => {
    if (selectedTab === "awaiting-review") {
      return (
        consultation.status === "awaiting review" && !consultation.assigned
      );
    } else if (selectedTab === "reviewed") {
      return consultation.status === "reviewed" && !consultation.assigned;
    } else if (selectedTab === "assigned") {
      return consultation.assigned;
    }
    return true;
  });

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConsultations = filteredConsultations.slice(
    startIndex,
    endIndex
  );
  const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to first page when changing tabs
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
    setCurrentPage(1);
  };

  const handleConsultationClick = () => {
    console.log("Consultation clicked");
    navigate("../ReviewConsultation");
  };

  const getStatusBadge = (status: string): string => {
    const styles: Record<string, string> = {
      "awaiting review": "bg-yellow-100 text-yellow-800",
      reviewed: "bg-green-100 text-green-800",
      "in-progress": "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return styles[status.toLowerCase()] || "bg-gray-100 text-gray-800";
  };

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
                <SearchInput
                  placeholder="Search consultations..."
                  width="w-full"
                  iconClassName="text-orange-500"
                  containerClassName="max-w-md"
                  iconColor="text-blue-500"
                  hoverRingColor="hover:ring-orange-300"
                  focusRingColor="focus:ring-orange-500"
                  onChange={(e) => {
                    /* handle search */
                  }}
                />
              </div>
              <div className="flex items-center justify-between">
                <Tabs value={selectedTab} className="w-full">
                  <TabsList>
                    <TabsTrigger
                      value="awaiting-review"
                      onClick={() => handleTabChange("awaiting-review")}
                    >
                      Awaiting Review
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviewed"
                      onClick={() => handleTabChange("reviewed")}
                    >
                      Reviewed
                    </TabsTrigger>
                    <TabsTrigger
                      value="assigned"
                      onClick={() => handleTabChange("assigned")}
                    >
                      Assigned
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>

          <div className="divide-y">
            {currentConsultations.map((consultation) => (
              <div
                key={consultation.id}
                className={`p-4 cursor-pointer ${
                  isDarkMode
                    ? "hover:bg-orange-500/80 hover:text-white"
                    : "hover:bg-orange-500/50"
                }`}
                onClick={handleConsultationClick}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={(e) => toggleAssigned(consultation.id, e)}
                      className="hover:bg-gray-100 p-1 rounded"
                    >
                      {consultation.assigned ? (
                        <CheckSquare className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Square className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">
                          {consultation.patientName}
                        </h3>
                        <span
                          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusBadge(
                            consultation.status
                          )}`}
                        >
                          {consultation.status}
                        </span>
                      </div>
                      <p className="text-sm">
                        {consultation.type} • {consultation.date}
                      </p>
                      <p className="text-sm">{consultation.doctorName}</p>
                      <p className="text-sm">
                        <i>{consultation.summary}</i>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">
                        {consultation.patientRating}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">
                        {consultation.empathyScore}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{consultation.qstarScore}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-0 w-full">
          <div className="w-full px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredConsultations.length)} of{" "}
              {filteredConsultations.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ClinicalTesting;
