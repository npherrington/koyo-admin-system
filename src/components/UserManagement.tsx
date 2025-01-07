import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Plus,
  MessageSquare,
  CreditCard,
  FileText,
  BarChart2,
  Headphones,
  Shield,
  Settings,
  Bell,
  ChevronDown,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const UserManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("users");

  const handleNavigation = (id: string, path?: string) => {
    setActiveSection(id);
    if (path) {
      navigate(path);
    }
  };
  const menuItems = [
    {
      icon: Activity,
      label: "Dashboard",
      id: "dashboard",
      path: "/",
    },
    {
      icon: Users,
      label: "User Management",
      id: "users",
      path: "/UserManagement",
    },
    {
      icon: MessageSquare,
      label: "Consultations",
      id: "consultations",
      path: "/Consultations",
    },
    {
      icon: CreditCard,
      label: "Subscriptions",
      id: "subscriptions",
      path: "/Subscriptions",
    },
    { icon: FileText, label: "Content", id: "content", path: "/Content" },
    {
      icon: BarChart2,
      label: "Analytics",
      id: "analytics",
      path: "/Analytics",
    },
    { icon: Headphones, label: "Support", id: "support", path: "/Support" },
    {
      icon: Shield,
      label: "Compliance",
      id: "compliance",
      path: "/Compliance",
    },
    { icon: Settings, label: "Settings", id: "settings", path: "/Settings" },
  ];
  const [selectedTab, setSelectedTab] = useState("patients");
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock data
  const patients = [
    {
      id: 1,
      name: "Sarah Adebayo",
      email: "sarah.a@email.com",
      phone: "+234 801 234 5678",
      status: "active",
      subscription: "Premium",
      lastConsultation: "2024-01-04",
      familyMembers: 3,
    },
    {
      id: 2,
      name: "John Okafor",
      email: "john.o@email.com",
      phone: "+234 802 345 6789",
      status: "inactive",
      subscription: "Basic",
      lastConsultation: "2023-12-28",
      familyMembers: 1,
    },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Oluwaseun Adeyemi",
      email: "dr.adeyemi@koyo.health",
      specialty: "General Practice",
      status: "active",
      consultations: 128,
      rating: 4.8,
      availability: "online",
    },
    {
      id: 2,
      name: "Dr. Chinua Achebe",
      email: "dr.achebe@koyo.health",
      specialty: "Pediatrics",
      status: "offline",
      consultations: 256,
      rating: 4.9,
      availability: "offline",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="relative">
        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-0 z-40"
            onClick={() => setIsSidebarOpen(false)} // Close sidebar when overlay is clicked
          ></div>
        )}
        <div className="flex justify-end items-center px-4 py-2">
          <Button
            className="text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-bg-gray-100 bg-gray-50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            Menu
          </Button>
        </div>
        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <ul className="fixed top-10 left-2 space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id, item.path)}
                  className={`flex items-center w-full p-2 rounded-lg ${
                    activeSection === item.id
                      ? "bg-orange-100 text-orange-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500">
            Manage patients and healthcare providers
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </button>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="patients" className="w-full">
              <TabsList>
                <TabsTrigger
                  value="patients"
                  onClick={() => setSelectedTab("patients")}
                >
                  Patients
                </TabsTrigger>
                <TabsTrigger
                  value="doctors"
                  onClick={() => setSelectedTab("doctors")}
                >
                  Doctors
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Filters and Search */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Active Users</DropdownMenuItem>
                  <DropdownMenuItem>Inactive Users</DropdownMenuItem>
                  <DropdownMenuItem>Premium Subscribers</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button className="flex items-center px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name/Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {selectedTab === "patients" ? "Subscription" : "Specialty"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {selectedTab === "patients" ? "Family Members" : "Rating"}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedTab === "patients"
                  ? patients.map((patient) => (
                      <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">
                                {patient.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {patient.email}
                              </div>
                              <div className="text-sm text-gray-500">
                                {patient.phone}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              patient.subscription === "Premium"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {patient.subscription}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              patient.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {patient.familyMembers} members
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded">
                              <MoreVertical className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Deactivate
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  : doctors.map((doctor) => (
                      <tr key={doctor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">
                                {doctor.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {doctor.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {doctor.specialty}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              doctor.availability === "online"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {doctor.availability}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 text-sm text-gray-600">
                              {doctor.rating}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger className="p-1 hover:bg-gray-100 rounded">
                              <MoreVertical className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>View Profile</DropdownMenuItem>
                              <DropdownMenuItem>View Schedule</DropdownMenuItem>
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                Suspend Access
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              Showing 1-10 of 100 results
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

export default UserManagement;
