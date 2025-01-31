import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Lock, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signIn } from "@/utils/auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Textarea } from "./ui/textarea";
import { useTheme } from "@/contexts/ThemeContext";
import useCheckAuthentication from "@/hooks/useCheckAuthentication";

interface CountryCode {
  country: string;
  code: string;
  flag: string;
}

const COUNTRY_CODES: CountryCode[] = [
  { country: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { country: "Nigeria", code: "+234", flag: "🇳🇬" },
  { country: "Canada", code: "+1", flag: "🇨🇦" },
  { country: "Mali", code: "+223", flag: "🇲🇱" },
  { country: "Gambia", code: "+220", flag: "🇬🇲" },
];

const LoginPage = () => {
  const { isDarkMode } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    COUNTRY_CODES[0]
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formatPhoneNumber = (digits: string, country: CountryCode) => {
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

  const {
    authenticate,
    error: authError,
    isLoading,
  } = useCheckAuthentication();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phoneNumber || !password) {
      setError("Please fill in all fields");
      return;
    }
    if (password.length !== 6) {
      setError("Password must be exactly 6 digits");
      return;
    }

    const digits = phoneNumber.replace(/\D/g, "");
    const formattedPhone = formatPhoneNumber(digits, selectedCountry);

    // Reset error state
    setError("");

    try {
      // The phone number without the 'tel:' prefix
      const phoneForAuth = formattedPhone.replace("tel:", "");
      const response = await authenticate(phoneForAuth, password);

      if (response && response.access_token) {
        signIn(response.access_token);
        navigate("/Dashboard");
      } else {
        setError("Authentication failed - no token received");
      }
    } catch (err) {
      setError(authError?.message || "Authentication failed");
    }
  };

  const handleForgotPassword = () => {
    setError("Please contact support for a new password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-4 p-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-orange-600">Koyo Admin</h1>
          <p>Healthcare Management System</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <ThemeToggle className="px-1 py-0 items-center justify-end" />
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to access your admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {/* Phone Number Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={`flex items-center gap-1 px-2 py-2 border rounded-md
                        ${
                          isDarkMode ? "hover:bg-slate-600" : "hover:bg-gray-50"
                        } focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    >
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.code}</span>
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
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className={`pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                        isDarkMode
                          ? "bg-slate-800 text-white"
                          : "bg-white text-gray-800"
                      }`}
                      placeholder="XXX-XXX-XXXX"
                      maxLength={12}
                    />
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, ""); // Only allow digits
                      if (value.length <= 6) {
                        // Limit to 6 digits
                        setPassword(value);
                      }
                    }}
                    className={`pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      isDarkMode
                        ? "bg-slate-800 text-white"
                        : "bg-white text-gray-800"
                    }`}
                    placeholder="6-digit PIN"
                    maxLength={6}
                    pattern="\d{6}"
                    inputMode="numeric"
                    required
                  />
                </div>
                {password && password.length < 6 && (
                  <p className="text-sm text-orange-600">
                    Please enter exactly 6 digits
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                // onClick={handleSubmit}
              >
                Sign In
              </button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <button
              className="text-sm text-gray-600 hover:text-orange-600"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
            {/* <button className="text-sm text-gray-600 hover:text-orange-600">
              Contact support
            </button> */}
          </CardFooter>
        </Card>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>Secure login • HIPAA compliant • 2FA enabled</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
