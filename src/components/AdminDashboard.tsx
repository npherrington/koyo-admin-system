import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  MessageSquare,
  CreditCard,
  FileText,
  BarChart2,
  Headphones,
  Shield,
  Settings,
  Bell,
  Search,
  ChevronDown,
  Activity,
  AlertCircle,
  BadgeCheck,
  Cpu,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

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
    {
      icon: BadgeCheck,
      label: "Quality Assurance",
      id: "qa",
      path: "/QualityAssurance",
    },
    {
      icon: Cpu,
      label: "AI Workflows",
      id: "ai",
      path: "/AiWorkflows",
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-orange-600">Koyo Admin</h1>
          <p className="text-xs text-gray-500">Healthcare Management System</p>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w- text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, consultations..."
                  className="pl-10 pr-4 py-2 w-96 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-bg-gray-100 bg-gray-50">
                  Filter By <ChevronDown className="ml-2 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>This month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <img
                  src="/src/assets/koyo-navigate_icon.png"
                  alt="Admin"
                  className="w-8 h-8 rounded-full"
                />
                <div className="text-sm">
                  <p className="font-medium">Admin User</p>
                  <p className="text-gray-500 text-xs">Super Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Critical Alerts */}
          <Alert className="mb-6 bg-red-100">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>System Updates</AlertTitle>
            <AlertDescription>
              New compliance requirements for Nigerian healthcare data
              protection are available. Please review and update settings.
            </AlertDescription>
          </Alert>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <Card className="bg-orange-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Patients
                </CardTitle>
                <Users className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3,521</div>
                <p className="text-xs text-green-500">+15% from last month</p>
              </CardContent>
            </Card>

            <Card className="bg-blue-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Doctors
                </CardTitle>
                <Users className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-gray-500">8 currently online</p>
              </CardContent>
            </Card>

            <Card className="bg-green-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Consultations
                </CardTitle>
                <MessageSquare className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-gray-500">Avg. response time: 2m</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Revenue (MTD)
                </CardTitle>
                <CreditCard className="w-4 h-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦2.4M</div>
                <p className="text-xs text-green-500">+22% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Active Consultations */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Active Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Urgent Case #1234</p>
                    <p className="text-xs text-gray-500">
                      Waiting for doctor - 3m
                    </p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-orange-100 text-orange-600 rounded-lg border border-orange-200">
                    Notify Doctor
                  </button>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      Case #1235 - Dr. Sarah
                    </p>
                    <p className="text-xs text-gray-500">In progress - 12m</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg border border-gray-200">
                    View Details
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Support Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-sm">Payment failed - User #5678</span>
                    <span className="ml-auto text-xs text-gray-500">
                      5m ago
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-sm">
                      Account access issue - Dr. James
                    </span>
                    <span className="ml-auto text-xs text-gray-500">
                      15m ago
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">API Response Time: 45ms</span>
                    <span className="ml-auto text-xs text-gray-500">
                      Normal
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Database Load: 32%</span>
                    <span className="ml-auto text-xs text-gray-500">
                      Optimal
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
