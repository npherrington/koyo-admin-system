import React, { useState } from "react";
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

const ConsultationsDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("active");

  // Mock data with proper semicolons
  const activeConsultations = [
    {
      id: "C-1234",
      patientName: "Sarah Adebayo",
      doctorName: "Dr. Oluwaseun Adeyemi",
      startTime: "10:30 AM",
      duration: "15m",
      status: "in-progress",
      type: "General Consultation",
      priority: "urgent",
    },
    {
      id: "C-1235",
      patientName: "John Okafor",
      doctorName: "Awaiting Assignment",
      startTime: "10:25 AM",
      duration: "5m",
      status: "waiting",
      type: "Follow-up",
      priority: "normal",
    },
  ];

  const completedConsultations = [
    {
      id: "C-1230",
      patientName: "Grace Johnson",
      doctorName: "Dr. Chinua Achebe",
      date: "2024-01-04",
      duration: "20m",
      status: "completed",
      type: "General Consultation",
      rating: 5,
    },
  ];

  type Status = "in-progress" | "waiting" | "completed" | "cancelled";

  const getStatusBadge = (status: Status): string => {
    const styles: Record<Status, string> = {
      "in-progress": "bg-blue-100 text-blue-800",
      waiting: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Sidebar activeSection="Consultations" />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Consultations</h1>
          <p className="text-gray-500">
            Monitor and manage patient consultations
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">5 waiting for doctor</p>
          </CardContent>
        </Card>

        <Card className="bg-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Today's Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-blue-600">+12% vs yesterday</p>
          </CardContent>
        </Card>

        <Card className="bg-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2m</div>
            <p className="text-xs text-gray-500">Target: &lt;2m</p>
          </CardContent>
        </Card>

        <Card className="bg-purple-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Patient Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-blue-600">96% positive feedback</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="border-b bg-slate-50">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="active" className="w-full">
              <TabsList className="bg-indigo-50 text-black-300">
                <TabsTrigger
                  value="active"
                  onClick={() => setSelectedTab("active")}
                >
                  Active Consultations
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  onClick={() => setSelectedTab("completed")}
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger value="all" onClick={() => setSelectedTab("all")}>
                  All Consultations
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
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
                  <DropdownMenuItem>High Priority</DropdownMenuItem>
                  <DropdownMenuItem>Waiting Assignment</DropdownMenuItem>
                  <DropdownMenuItem>Long Duration</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Active Consultations */}
          {selectedTab === "active" && (
            <div className="divide-y">
              {activeConsultations.map((consultation) => (
                <div key={consultation.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          consultation.priority === "urgent"
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      />
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
                          {consultation.type} • Started {consultation.startTime}
                        </p>
                        <p className="text-sm text-gray-500">
                          {consultation.doctorName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">Duration</p>
                        <p className="text-sm text-gray-500">
                          {consultation.duration}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded">
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Assign Doctor</DropdownMenuItem>
                          <DropdownMenuItem>Send Alert</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            End Consultation
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Completed Consultations */}
          {selectedTab === "completed" && (
            <div className="divide-y">
              {completedConsultations.map((consultation) => (
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
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span className="text-sm">{consultation.rating}</span>
                      </div>
                      <button className="text-orange-600 hover:text-orange-700">
                        View Summary
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t bg-slate-50">
            <div className="text-sm text-gray-500">
              Showing 1-10 of 128 results
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 border rounded hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border rounded bg-orange-50 text-orange-600">
                1
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border rounded hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationsDashboard;
