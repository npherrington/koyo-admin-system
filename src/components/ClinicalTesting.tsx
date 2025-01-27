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
import ConsultationItem from "@/components/ui/ConsultationItem";

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
  assignedDoctor: string | null;
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
          ? { ...consultation, status: "assigned" }
          : consultation
      )
    );
  };

  // Filter consultations based on selected tab
  const filteredConsultations = consultations.filter((consultation) => {
    if (selectedTab === "awaiting-review") {
      return (
        consultation.status === "awaiting review" &&
        !consultation.assignedDoctor
      );
    } else if (selectedTab === "reviewed") {
      return consultation.status === "reviewed" && !consultation.assignedDoctor;
    } else if (selectedTab === "assigned") {
      return consultation.status === "assigned";
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
                      value="assigned"
                      onClick={() => handleTabChange("assigned")}
                    >
                      Assigned
                    </TabsTrigger>
                    <TabsTrigger
                      value="reviewed"
                      onClick={() => handleTabChange("reviewed")}
                    >
                      Reviewed
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
            <div className="divide-y">
              {currentConsultations.map((consultation) => (
                <ConsultationItem
                  key={consultation.id}
                  consultation={consultation}
                  onAssignmentToggle={toggleAssigned}
                  isDarkMode={isDarkMode}
                />
              ))}
            </div>
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
