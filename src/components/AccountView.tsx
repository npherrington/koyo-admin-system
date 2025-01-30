import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, UserX } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAccountFind from "@/hooks/useAccountFind";
import EditAccountOverlay from "@/components/EditAccountForm";
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

const AccountView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, setQuery } = useAccountFind();

  //   console.log("DATA:", data);
  useEffect(() => {
    if (id) {
      setQuery({ id });
    }
  }, [id, setQuery]);

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-red-600 text-center">
          <p>Error loading account: {error}</p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <p>Account not found</p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const account = data;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={handleBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{account.name}</h1>
            <p className="font-semibold">Account Details</p>
          </div>
        </div>
        <div className="flex space-x-2">
          {/* <Button variant="secondary">
            <Edit className="w-4 h-4 mr-2" />
            Edit Account
          </Button> */}
          <EditAccountOverlay
            account={account}
            onSuccess={() => {
              // Refresh the account data
              if (id) {
                setQuery({ id });
              }
            }}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="destructive">
                <UserX className="w-4 h-4 mr-2" />
                Manage Access
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="text-red-600">
                Deactivate Account
              </DropdownMenuItem>
              <DropdownMenuItem>Change Access Level</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Account Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-3">
            <div>
              <p className="text-sm opacity-75">Full Name</p>
              <p className="font-medium">{account.name}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Phone Number</p>
              <p className="font-medium">{account.phone_number}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Date of Birth</p>
              <p className="font-medium">
                {new Date(account.date_of_birth).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-75">Sex</p>
              <p className="font-medium">{account.sex}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Location</p>
              <p className="font-medium">{account.location}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-3">
            <div>
              <p className="text-sm opacity-75">Account ID</p>
              <p className="font-medium">{account.id}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Access Level</p>
              <p className="font-medium">{account.access_level}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Language</p>
              <p className="font-medium">{account.language}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Number of Children</p>
              <p className="font-medium">{account.num_children}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Created At</p>
              <p className="font-medium">
                {new Date(account.created_at).toLocaleDateString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Additional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-3">
            <div>
              <p className="text-sm opacity-75">Patient IDs</p>
              <p className="font-medium">
                {account.patient_ids.length > 0
                  ? account.patient_ids.join(", ")
                  : "No associated patients"}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-75">Referral Code</p>
              <p className="font-medium">{account.referral_code || "None"}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Credits</p>
              <p className="font-medium">{account.credits}</p>
            </div>
            <div>
              <p className="text-sm opacity-75">Account Status</p>
              <p className="font-medium">
                {account.deleted_at ? "Deactivated" : "Active"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountView;
