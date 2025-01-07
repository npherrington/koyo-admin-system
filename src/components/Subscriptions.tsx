import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Download,
  CreditCard,
  TrendingUp,
  Users,
  DollarSign,
  ChevronUp,
  ChevronDown,
  AlertCircle,
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

const SubscriptionsDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("active");

  // Mock data
  const subscriptions = [
    {
      id: "SUB-1234",
      customerName: "Sarah Adebayo",
      email: "sarah.a@email.com",
      plan: "Premium",
      billing: "Annual",
      amount: "₦90,000",
      status: "active",
      startDate: "2024-01-01",
      nextBilling: "2025-01-01",
      paymentMethod: "Credit Card (**** 4242)",
    },
    {
      id: "SUB-1235",
      customerName: "John Okafor",
      email: "john.o@email.com",
      plan: "Basic",
      billing: "Monthly",
      amount: "₦2,000",
      status: "active",
      startDate: "2024-01-05",
      nextBilling: "2024-02-05",
      paymentMethod: "MTN Mobile Money",
    },
    {
      id: "SUB-1236",
      customerName: "Grace Johnson",
      email: "grace.j@email.com",
      plan: "Premium",
      billing: "Monthly",
      amount: "₦10,000",
      status: "canceled",
      startDate: "2023-12-01",
      nextBilling: "2024-01-01",
      paymentMethod: "Credit Card (**** 5678)",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscriptions</h1>
          <p className="text-gray-500">
            Manage customer subscriptions and billing
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              Monthly Revenue
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦2.4M</div>
            <div className="flex items-center text-xs text-green-500">
              <ChevronUp className="w-3 h-3" />
              22% vs last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Active Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,521</div>
            <div className="flex items-center text-xs text-green-500">
              <ChevronUp className="w-3 h-3" />
              15% growth
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Premium Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-gray-500">1,127 premium users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <div className="flex items-center text-xs text-green-500">
              <ChevronDown className="w-3 h-3" />
              0.8% vs last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plan Distribution */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-sm">
            Subscription Plan Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Basic Plan (Monthly)</p>
                  <p className="text-sm text-gray-500">₦2,000/month</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">2,394 users</p>
                  <p className="text-sm text-gray-500">68%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Basic Plan (Annual)</p>
                  <p className="text-sm text-gray-500">₦18,000/year</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">450 users</p>
                  <p className="text-sm text-gray-500">13%</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Premium Plan (Monthly)</p>
                  <p className="text-sm text-gray-500">₦10,000/month</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">527 users</p>
                  <p className="text-sm text-gray-500">15%</p>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Premium Plan (Annual)</p>
                  <p className="text-sm text-gray-500">₦90,000/year</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">150 users</p>
                  <p className="text-sm text-gray-500">4%</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="active" className="w-full">
              <TabsList>
                <TabsTrigger
                  value="active"
                  onClick={() => setSelectedTab("active")}
                >
                  Active Subscriptions
                </TabsTrigger>
                <TabsTrigger
                  value="canceled"
                  onClick={() => setSelectedTab("canceled")}
                >
                  Canceled
                </TabsTrigger>
                <TabsTrigger value="all" onClick={() => setSelectedTab("all")}>
                  All Subscriptions
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
                  placeholder="Search subscriptions..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Premium Plans</DropdownMenuItem>
                  <DropdownMenuItem>Basic Plans</DropdownMenuItem>
                  <DropdownMenuItem>Annual Billing</DropdownMenuItem>
                  <DropdownMenuItem>Monthly Billing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Subscriptions Table */}
          <div className="divide-y">
            {subscriptions
              .filter(
                (sub) =>
                  selectedTab === "all" ||
                  (selectedTab === "active" && sub.status === "active") ||
                  (selectedTab === "canceled" && sub.status === "canceled")
              )
              .map((subscription) => (
                <div key={subscription.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">
                          {subscription.customerName}
                        </h3>
                        <span
                          className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                            subscription.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {subscription.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">
                        {subscription.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {subscription.plan} • {subscription.billing} •{" "}
                        {subscription.paymentMethod}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{subscription.amount}</p>
                        <p className="text-sm text-gray-500">
                          Next billing: {subscription.nextBilling}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded">
                          <MoreVertical className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Change Plan</DropdownMenuItem>
                          <DropdownMenuItem>Update Payment</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancel Subscription
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="text-sm text-gray-500">
              Showing 1-10 of 3,521 results
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

export default SubscriptionsDashboard;
