import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MoreVertical, Download, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Sidebar from "./ui/side-bar";
import usePatientsSearch from "@/hooks/usePatientsSearch";
import useAccountSearch from "@/hooks/useAccountSearch";

interface Account {
  id: string;
  phone_number: string;
  access_level: string;
  name: string;
  picture: null;
  date_of_birth: string;
  sex: string;
  location: string;
  language: string;
  num_children: number;
  patient_ids: string[];
  referral_code: string;
  promo_code: null;
  credits: number;
  created_at: string;
  deleted_at: null;
  accepted_terms_at: null;
  accepted_clinical_trial_at: null;
}

const UserManagement = () => {
  const navigate = useNavigate();
  const { data, loading, error, setQuery } = useAccountSearch();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value) {
      setQuery({ name: value });
    } else {
      setQuery({});
    }
  };

  const handleNavigate = (id: string) => {
    console.log("ID to pass to:", id);
    navigate(`./AccountView/${id}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Sidebar activeSection="User Management" />
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p>Manage patients and healthcare providers</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New User
        </button>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Accounts</h3>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {/* Filters and Search */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search users..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center px-3 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 bg-gray-50">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Active Users</DropdownMenuItem>
                  <DropdownMenuItem>Inactive Users</DropdownMenuItem>
                  <DropdownMenuItem>Premium Subscribers</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button className="flex items-center px-3 py-2 border rounded-lg text-orange-600 hover:bg-orange-100 bg-orange-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-4">{error}</div>
          ) : (
            <div className="flex flex-col space-y-4 p-4">
              {data?.map((account: Account) => (
                <Card
                  key={account.id}
                  className="rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 hover:ring-2 hover:ring-orange-500 cursor-pointer"
                  onClick={() => handleNavigate(account.id)}
                >
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg font-medium">
                          {account.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500">
                          ID: {account.id}
                        </p>
                        <p className="text-sm text-gray-500">
                          Access Level: {account.access_level}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

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
