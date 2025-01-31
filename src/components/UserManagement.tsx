import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, MoreVertical, Download, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Sidebar from "./ui/side-bar";
import useAccountSearch from "@/hooks/useAccountSearch";
import Pagination from "@/components/ui/pagination";
import { useTheme } from "@/contexts/ThemeContext";
import { AccountFindByTelephone } from "./ui/account-find-by-telephone.tsx";
import NewUserForm from "@/components/AddNewUserForm";

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

const ITEMS_PER_PAGE = 5;

const ACCESS_LEVELS = {
  PATIENT: "standard",
  DOCTOR: "doctor",
  ADMIN: "admin",
} as const;

const UserManagement = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { data, loading, error, setQuery } = useAccountSearch();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAccessLevel, setSelectedAccessLevel] = useState<string | null>(
    null
  );
  const [showNewUserForm, setShowNewUserForm] = useState(false);

  // Debug logging
  useEffect(() => {
    console.log("Raw API Response:", data);
    console.log("Response type:", typeof data);
    console.log("Response keys:", data ? Object.keys(data) : "No data");
  }, [data]);

  // Extract accounts with proper type checking
  const accounts = React.useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (typeof data === "object" && "data" in data) {
      return Array.isArray(data.data) ? data.data : [];
    }
    return [];
  }, [data]);

  // Calculate current page's accounts
  const currentAccounts = React.useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return accounts.slice(startIndex, endIndex);
  }, [accounts, currentPage]);

  const handleAccessLevelFilter = (accessLevel: string) => {
    setSelectedAccessLevel(accessLevel);
    setCurrentPage(1);
    setSearchTerm(""); // Reset search term when filtering
    setQuery({ access_level: accessLevel.toLowerCase() });
  };

  const clearFilters = () => {
    setSelectedAccessLevel(null);
    setSearchTerm("");
    setCurrentPage(1);
    setQuery({});
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
                <AccountFindByTelephone />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`flex items-center px-3 py-2 rounded-lg hover:bg-orange-600 hover:text-white ${
                    selectedAccessLevel ? "bg-orange-600 text-white" : ""
                  }  ${
                    isDarkMode
                      ? "border border-slate-400"
                      : "border border-slate-600"
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {selectedAccessLevel || "Filter"}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() =>
                      handleAccessLevelFilter(ACCESS_LEVELS.PATIENT)
                    }
                  >
                    Patients
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      handleAccessLevelFilter(ACCESS_LEVELS.DOCTOR)
                    }
                  >
                    Doctors
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleAccessLevelFilter(ACCESS_LEVELS.ADMIN)}
                  >
                    Admins
                  </DropdownMenuItem>
                  {selectedAccessLevel && (
                    <DropdownMenuItem
                      onClick={clearFilters}
                      className="text-red-600"
                    >
                      Clear Filter
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>{" "}
            </div>
            <button
              className="flex items-center px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              onClick={() => setShowNewUserForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New User
            </button>
            {showNewUserForm && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-background w-full max-w-2xl rounded-lg">
                  <NewUserForm onClose={() => setShowNewUserForm(false)} />
                </div>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 p-4">{error}</div>
          ) : (
            <div className="flex flex-col space-y-4 p-4">
              {currentAccounts.map((account: Account) => (
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
                        <p className="text-sm opacity-75">
                          Phone Number: {account.phone_number}
                        </p>
                        <p className="text-sm opacity-75">
                          Location: {account.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm opacity-75">
                          Account ID: {account.id}
                        </p>
                        <p className="text-sm opacity-75">
                          Access Level: {account.access_level}
                        </p>
                        <p className="text-sm opacity-75">
                          Created At:{" "}
                          {new Intl.DateTimeFormat("en-GB", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(new Date(account.created_at))}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
              {currentAccounts.length === 0 && !loading && (
                <div className="text-center py-8 text-gray-500">
                  No accounts found
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="p-0 w-full">
          <div className="w-full px-6 py-4 flex items-center justify-between border-t">
            <Pagination
              items={accounts}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserManagement;
