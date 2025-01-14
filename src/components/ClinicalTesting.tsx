import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Filter,
  MessageSquare,
  MoreVertical,
  Download,
  Users,
  CreditCard,
  FileText,
  BarChart2,
  Headphones,
  Shield,
  Settings,
  Activity,
  BadgeCheck,
  Cpu,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import Sidebar from "./ui/side-bar";
import { List } from "postcss/lib/list";

interface Consultation {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  duration: string;
  status: string;
  type: string;
  rating: number;
  summary: string;
}

const ClinicalTesting = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  useEffect(() => {
    // Fetch the JSON file
    fetch("./public/mockConsultations.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Returns a promise
      })
      .then((data: Consultation[]) => {
        setConsultations(data);
      })
      .catch((error) => {
        console.error("Error loading the JSON file:", error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate the index range of consultations to display
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentConsultations = consultations.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(consultations.length / itemsPerPage);

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

  const getStatusBadge = (status) => {
    const styles = {
      "in-progress": "bg-blue-100 text-blue-800",
      waiting: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Sidebar activeSection="Clinical Testing" />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clinical Testing</h1>
          <p className="text-gray-500">Assess consultations?</p>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="border-b bg-slate-50">
          <span className="text-black font-bold text-xl">Consultations</span>
        </CardHeader>

        <CardContent className="p-0">
          {/* Filters and Search */}
          <div className="p-4 border-b flex items-center justify-between bg-slate-50">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search consultations..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    5 <span className="text-yellow-500 mr-1">★</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    4 <span className="text-yellow-500 mr-1">★</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    3 <span className="text-yellow-500 mr-1">★</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    2 <span className="text-yellow-500 mr-1">★</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    1 <span className="text-yellow-500 mr-1">★</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="divide-y">
            {currentConsultations.map((consultation) => (
              <div key={consultation.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
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
                    <p className="text-sm text-gray-500">
                      {consultation.type} • {consultation.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      {consultation.doctorName}
                    </p>
                    <p className="text-sm text-gray-500">
                      <i>{consultation.summary}</i>
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <span className="text-yellow-500 mr-1">★</span>
                      <span className="text-sm">{consultation.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t bg-slate-50">
            <div className="text-sm text-gray-500">
              Showing 1-{itemsPerPage} of {consultations.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 border rounded hover:bg-gray-50"
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-3 py-1 border rounded hover:bg-gray-50"
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClinicalTesting;
