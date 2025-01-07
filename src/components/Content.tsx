import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Plus,
  FileText,
  Book,
  Link,
  Eye,
  Edit,
  Trash2,
  Globe,
  BookOpen,
  Clock,
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

const ContentDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("glossary");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const glossaryEntries = [
    {
      id: "G-1234",
      term: "Malaria",
      category: "Diseases",
      language: "English",
      lastUpdated: "2024-01-05",
      status: "published",
      views: 1240,
      brief: "A mosquito-borne disease caused by parasites...",
      author: "Dr. Oluwaseun Adeyemi",
    },
    {
      id: "G-1235",
      term: "Hypertension",
      category: "Conditions",
      language: "English",
      lastUpdated: "2024-01-04",
      status: "draft",
      views: 890,
      brief: "High blood pressure that can lead to severe...",
      author: "Dr. Chinua Achebe",
    },
  ];

  const healthResources = [
    {
      id: "R-1234",
      title: "Understanding Diabetes",
      type: "Guide",
      category: "Chronic Conditions",
      language: "English",
      lastUpdated: "2024-01-05",
      status: "published",
      views: 2450,
      brief: "A comprehensive guide to managing diabetes...",
      author: "Dr. Sarah Johnson",
    },
    {
      id: "R-1235",
      title: "Pregnancy Care",
      type: "Article",
      category: "Maternal Health",
      language: "English",
      lastUpdated: "2024-01-04",
      status: "published",
      views: 1890,
      brief: "Essential information for expectant mothers...",
      author: "Dr. Grace Okafor",
    },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      review: "bg-blue-100 text-blue-800",
      archived: "bg-gray-100 text-gray-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="text-gray-500">
            Manage glossary entries and health resources
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
            <Plus className="w-4 h-4 mr-2" />
            Add New Content
          </button>
        </div>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-gray-500">142 added this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52.4K</div>
            <p className="text-xs text-green-500">+18% vs last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Languages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-gray-500">English, Yoruba, Hausa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Content Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">Updates pending review</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="glossary" className="w-full">
              <TabsList>
                <TabsTrigger
                  value="glossary"
                  onClick={() => setSelectedTab("glossary")}
                >
                  Intelligent Glossary
                </TabsTrigger>
                <TabsTrigger
                  value="resources"
                  onClick={() => setSelectedTab("resources")}
                >
                  Health Resources
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
                  placeholder="Search content..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Published</DropdownMenuItem>
                  <DropdownMenuItem>Drafts</DropdownMenuItem>
                  <DropdownMenuItem>Under Review</DropdownMenuItem>
                  <DropdownMenuItem>Most Viewed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Content List */}
          <div className="divide-y">
            {(selectedTab === "glossary"
              ? glossaryEntries
              : healthResources
            ).map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium">{item.term || item.title}</h3>
                      <span
                        className={`ml-2 px-2 py-0.5 rounded-full text-xs ${getStatusBadge(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{item.brief}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" />
                        {item.language}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-4 h-4 mr-1" />
                        {item.views} views
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Updated {item.lastUpdated}
                      </span>
                      <span className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="p-2 hover:bg-gray-100 rounded">
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Preview</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Translate</DropdownMenuItem>
                        <DropdownMenuItem>Review History</DropdownMenuItem>
                        <DropdownMenuItem>Usage Analytics</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Archive
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
              Showing 1-10 of {selectedTab === "glossary" ? "856" : "389"}{" "}
              results
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

export default ContentDashboard;
