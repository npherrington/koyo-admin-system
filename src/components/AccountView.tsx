import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, UserX, KeyRound, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useAccountFind from "@/hooks/useAccountFind";
import useEditAccount from "@/hooks/useEditAccount";
import { useResetPassword } from "@/hooks/useResetPassword";
import EditAccountOverlay from "@/components/EditAccountForm";
import {
  ColourCard,
  ColourCardContent,
  ColourCardHeader,
  ColourCardTitle,
} from "./ui/colour-card";
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

const COUNTRY_CODES = [
  { country: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { country: "Nigeria", code: "+234", flag: "🇳🇬" },
  { country: "Canada", code: "+1", flag: "🇨🇦" },
  { country: "Mali", code: "+223", flag: "🇲🇱" },
  { country: "Gambia", code: "+220", flag: "🇬🇲" },
];

const AccountView = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error, setQuery } = useAccountFind();
  const {
    editAccount,
    loading: editLoading,
    error: editError,
  } = useEditAccount();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    country: "Nigeria",
    code: "+234",
    flag: "🇳🇬",
  });
  const [newPassword, setNewPassword] = useState("");
  const { resetPassword, isLoading, isSuccess } = useResetPassword();

  const formatPhoneNumber = (
    digits: string,
    country: (typeof COUNTRY_CODES)[0]
  ) => {
    switch (country.code) {
      case "+44": // UK
        const areaCode = digits.slice(0, 4);
        const restOfNumber = digits.slice(4);
        return `tel:+44-${areaCode}-${restOfNumber}`;
      case "+234": // Nigeria
        return `tel:+234-${digits}`;
      case "+1": // Canada
        return `tel:+1-${digits}`;
      case "+223": // Mali
        return `tel:+223-${digits}`;
      case "+220": // Gambia
        return `tel:+220-${digits}`;
      default:
        return `tel:${country.code}-${digits}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digits = value.replace(/\D/g, "");

    let formatted = digits;
    if (selectedCountry.code === "+44") {
      // UK format: XXXX XXXXXX
      if (digits.length > 4) {
        formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
    } else {
      // Default format: XXX-XXX-XXXX
      if (digits.length > 3) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3)}`;
      }
      if (digits.length > 6) {
        formatted = `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
          6
        )}`;
      }
    }

    setPhoneNumber(formatted);
  };

  //   console.log("DATA:", data);
  useEffect(() => {
    if (id) {
      setQuery({ id });
    }
  }, [id, setQuery]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleAccessChange = async (account_id: string, newAccess: string) => {
    if (!data) return;

    try {
      await editAccount({
        account_id: account_id,
        changes: {
          access_level: newAccess,
        },
      });

      // Refresh the account data after successful update
      if (id) {
        setQuery({ id });
      }
    } catch (err) {
      console.error("Failed to update access level:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600" />
      </div>
    );
  }

  const generatePassword = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handlePasswordReset = async () => {
    if (!phoneNumber) return;

    // Generate new password
    const newPass = generatePassword();
    setNewPassword(newPass);

    // Format the phone number according to the selected country code
    const formattedNumber = formatPhoneNumber(
      phoneNumber.replace(/\D/g, ""),
      selectedCountry
    );

    try {
      await resetPassword(formattedNumber, newPass);

      if (isSuccess) {
        // You might want to show a success message or handle the success case
        // The password will be shown in the purple card as it already does
      }
    } catch (err) {
      console.error("Failed to reset password:", err);
    }
  };

  const handleClose = () => {
    setResetDialogOpen(false);
    setPhoneNumber("");
    setNewPassword("");
  };

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
          {/* Password Reset Dialog */}
          <Button variant="secondary" onClick={() => setResetDialogOpen(true)}>
            <KeyRound className="w-4 h-4 mr-2" />
            Reset Password
          </Button>
          <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-2 border rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500">
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.code}</span>
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {COUNTRY_CODES.map((country) => (
                          <DropdownMenuItem
                            key={country.code}
                            onClick={() => setSelectedCountry(country)}
                            className="cursor-pointer"
                          >
                            <span className="mr-2">{country.flag}</span>
                            <span>{country.country}</span>
                            <span className="ml-2 text-gray-500">
                              {country.code}
                            </span>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="XXX-XXX-XXXX"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      maxLength={12}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePasswordReset}
                    disabled={
                      phoneNumber.replace(/\D/g, "").length < 10 || isLoading
                    }
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        Resetting...
                      </div>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </div>

                {error && (
                  <div className="text-red-500 text-sm mt-2">{error}</div>
                )}

                {newPassword && isSuccess && (
                  <ColourCard variant="purple">
                    <ColourCardHeader>
                      <ColourCardTitle className="text-start text-lg">
                        New password: {newPassword}
                      </ColourCardTitle>
                    </ColourCardHeader>
                  </ColourCard>
                )}
              </div>
            </DialogContent>
          </Dialog>
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
              <Button variant="default">
                <UserX className="w-4 h-4 mr-2" />
                {"<Manage Access>"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleAccessChange(account.id, "patient")}
                className={
                  account.access_level === "patient" ? "bg-secondary" : ""
                }
              >
                Set as Patient
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAccessChange(account.id, "doctor")}
                className={
                  account.access_level === "doctor" ? "bg-secondary" : ""
                }
              >
                Set as Doctor
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleAccessChange(account.id, "admin")}
                className={
                  account.access_level === "admin" ? "bg-secondary" : ""
                }
              >
                Set as Admin
              </DropdownMenuItem>
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
