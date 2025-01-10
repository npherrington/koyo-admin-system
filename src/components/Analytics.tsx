import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Download,
  Users,
  Star,
  Activity,
  ChevronUp,
  MessageSquare,
  CreditCard,
  FileText,
  BarChart2,
  Headphones,
  Shield,
  Settings,
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
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { Button } from "./ui/button";
import Sidebar from "./ui/side-bar";

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data for charts
  const userGrowthData = [
    { date: "2024-01-01", users: 3200 },
    { date: "2024-01-02", users: 3300 },
    { date: "2024-01-03", users: 3450 },
    { date: "2024-01-04", users: 3521 },
    { date: "2024-01-05", users: 3640 },
  ];

  const consultationData = [
    { date: "2024-01-01", total: 120, premium: 45, basic: 75 },
    { date: "2024-01-02", total: 145, premium: 55, basic: 90 },
    { date: "2024-01-03", total: 132, premium: 48, basic: 84 },
    { date: "2024-01-04", total: 158, premium: 62, basic: 96 },
    { date: "2024-01-05", total: 142, premium: 52, basic: 90 },
  ];

  const responseTimeData = [
    { hour: "00:00", time: 1.8 },
    { hour: "04:00", time: 1.5 },
    { hour: "08:00", time: 2.2 },
    { hour: "12:00", time: 2.8 },
    { hour: "16:00", time: 2.5 },
    { hour: "20:00", time: 1.9 },
  ];

  const doctorPerformanceData = [
    { name: "Dr. Adeyemi", rating: 4.8, consultations: 256, responseTime: 2.1 },
    { name: "Dr. Achebe", rating: 4.9, consultations: 234, responseTime: 1.9 },
    { name: "Dr. Johnson", rating: 4.7, consultations: 198, responseTime: 2.3 },
    { name: "Dr. Okafor", rating: 4.8, consultations: 221, responseTime: 2.0 },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Sidebar activeSection="Analytics" />
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">
            Platform performance and user engagement metrics
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 bg-gray-50">
              <Calendar className="w-4 h-4 mr-2" />
              {timeRange === "7d"
                ? "Last 7 days"
                : timeRange === "30d"
                ? "Last 30 days"
                : timeRange === "90d"
                ? "Last 90 days"
                : "Custom"}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setTimeRange("7d")}>
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("30d")}>
                Last 30 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("90d")}>
                Last 90 days
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeRange("custom")}>
                Custom range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="bg-orange-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,521</div>
            <div className="flex items-center text-xs text-blue-600">
              <ChevronUp className="w-3 h-3" />
              15% vs last period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1m</div>
            <div className="flex items-center text-xs text-blue-600">
              <ChevronUp className="w-3 h-3" />
              0.3m vs target
            </div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Patient Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <div className="flex items-center text-xs text-blue-600">
              <ChevronUp className="w-3 h-3" />
              0.2 vs last period
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* User Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#F97316"
                    fill="#FFEDD5"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Consultations */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Daily Consultations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={consultationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="premium" stackId="a" fill="#F97316" />
                  <Bar dataKey="basic" stackId="a" fill="#FFEDD5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Response Time by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="time"
                    stroke="#F97316"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Doctor Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Doctor Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {doctorPerformanceData.map((doctor, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{doctor.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>{doctor.rating}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Consultations</p>
                      <p className="font-medium">{doctor.consultations}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg Response</p>
                      <p className="font-medium">{doctor.responseTime}m</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">API Response Time</p>
                  <p className="text-sm text-gray-500">
                    Average latency across all endpoints
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">45ms</p>
                  <p className="text-xs text-green-500">-5ms vs last week</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Error Rate</p>
                  <p className="text-sm text-gray-500">
                    Percentage of failed requests
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">0.12%</p>
                  <p className="text-xs text-green-500">-0.03% vs last week</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Database Load</p>
                  <p className="text-sm text-gray-500">
                    Average CPU utilization
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">32%</p>
                  <p className="text-xs text-gray-500">Within normal range</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
