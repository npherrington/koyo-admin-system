import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
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
  Sun,
  Moon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Sidebar from "./ui/side-bar";
import { isAuthenticated } from "@/utils/auth";
import { Button } from "./ui/button";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ColourCard,
  ColourCardHeader,
  ColourCardTitle,
  ColourCardContent,
} from "@/components/ui/colour-card";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const { isDarkMode, toggleTheme } = useTheme();

  const handleProfileButton = () => {
    navigate("/Profile");
  };

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    const checkAuthentication = () => {
      setAuthenticated(isAuthenticated());
    };

    checkAuthentication(); // Update the authentication state

    // Optionally, you can subscribe to authentication changes if you're using something like global state or an event listener
  }, []);
  if (authenticated == null) {
    return <div>Loading ....</div>;
  }
  console.log("auth:", authenticated);
  if (!authenticated) {
    return <Navigate to="/signin" />; // Redirect to sign-in if not authenticated
  }
  return (
    <div
      className={`flex h-screen ${
        isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-64 shadow-lg ${
          isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"
        }`}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold text-orange-600">Koyo Admin</h1>
          <p className="text-xs text-gray-500">Healthcare Management System</p>
        </div>
        <Sidebar activeSection="Dashboard" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header
          className={`${
            isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w- text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users, consultations..."
                  className={`${
                    isDarkMode
                      ? "bg-slate-800 text-white"
                      : "bg-white text-black"
                  } pl-10 pr-4 py-2 w-96 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"`}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`${
                    isDarkMode
                      ? "bg-slate-800 text-white"
                      : "bg-slate-50 text-black"
                  } flex items-center px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border border-bg-gray-100`}
                >
                  Filter By <ChevronDown className="ml-2 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>Last 7 days</DropdownMenuItem>
                  <DropdownMenuItem>This month</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-4">
              <span>{isDarkMode ? <Moon /> : <Sun />}</span>
              <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
            </div>

            <div className="flex items-center space-x-4">
              {/* <Bell className="w-5 h-5 text-gray-600" /> */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-1 py-0 text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                    <Bell className="w-5 h-5 text-gray-600" />{" "}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Notification one</DropdownMenuItem>
                  <DropdownMenuItem>Notification two</DropdownMenuItem>
                  <DropdownMenuItem>Notification three</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span> */}
              <div className="flex items-center space-x-3">
                <Button
                  className="px-2 bg-white hover:bg-orange-100"
                  onClick={handleProfileButton}
                >
                  <img
                    src="https://www.w3schools.com/w3images/avatar2.png"
                    alt="Admin"
                    className="w-8 h-8 rounded-full"
                  />
                </Button>

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
            <ColourCard variant="orange">
              <ColourCardHeader className="flex flex-row items-center justify-between pb-2">
                <ColourCardTitle
                  variant="orange"
                  className="text-sm font-medium"
                >
                  Active Patients
                </ColourCardTitle>
                <Users className="w-4 h-4 text-gray-500" />
              </ColourCardHeader>
              <ColourCardContent variant="orange">
                <div className="text-2xl font-bold ">3,521</div>
                <p className="text-xs text-green-500">+15% from last month</p>
              </ColourCardContent>
            </ColourCard>

            <ColourCard variant="blue">
              <ColourCardHeader className="flex flex-row items-center justify-between pb-2">
                <ColourCardTitle variant="blue" className="text-sm font-medium">
                  Active Doctors
                </ColourCardTitle>
                <Users className="w-4 h-4 text-gray-500" />
              </ColourCardHeader>
              <ColourCardContent variant="blue">
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-gray-500">8 currently online</p>
              </ColourCardContent>
            </ColourCard>

            {/* Today's Consultations Card */}
            <ColourCard variant="green">
              <ColourCardHeader className="flex flex-row items-center justify-between pb-2">
                <ColourCardTitle
                  variant="green"
                  className="text-sm font-medium"
                >
                  Today's Consultations
                </ColourCardTitle>
                <MessageSquare className="w-4 h-4 text-gray-500" />
              </ColourCardHeader>
              <ColourCardContent variant="green">
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-gray-500">Avg. response time: 2m</p>
              </ColourCardContent>
            </ColourCard>

            {/* Revenue Card */}
            <ColourCard variant="gray">
              <ColourCardHeader className="flex flex-row items-center justify-between pb-2">
                <ColourCardTitle variant="gray" className="text-sm font-medium">
                  Revenue (MTD)
                </ColourCardTitle>
                <CreditCard className="w-4 h-4 text-gray-500" />
              </ColourCardHeader>
              <ColourCardContent variant="gray">
                <div className="text-2xl font-bold text-gray-900">₦2.4M</div>
                <p className="text-xs text-green-500">+22% from last month</p>
              </ColourCardContent>
            </ColourCard>
          </div>

          {/* Active Consultations */}
          <Card
            className={`mb-6 ${
              isDarkMode ? "bg-slate-800 text-white" : "bg-white text-black"
            }`}
          >
            <CardHeader>
              <CardTitle>Active Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-orange-50 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm text-black font-medium">
                      Urgent Case #1234
                    </p>
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
                    <p className="text-sm text-black font-medium">
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
            <ColourCard variant="purple" className="mb-6">
              <ColourCardHeader>
                <ColourCardTitle variant="purple">
                  Support Tickets
                </ColourCardTitle>
              </ColourCardHeader>
              <ColourCardContent variant="purple">
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
              </ColourCardContent>
            </ColourCard>
            <ColourCard variant="yellow" className="mb-6">
              <ColourCardHeader>
                <ColourCardTitle variant="yellow">
                  System Health
                </ColourCardTitle>
              </ColourCardHeader>
              <ColourCardContent variant="yellow">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">API Response Time: 45ms</span>
                    <span className="ml-auto text-xs opacity-70">Normal</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Database Load: 32%</span>
                    <span className="ml-auto text-xs opacity-70">Optimal</span>
                  </div>
                </div>
              </ColourCardContent>
            </ColourCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
