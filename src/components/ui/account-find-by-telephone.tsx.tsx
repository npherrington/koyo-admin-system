import * as React from "react";
import { Search, ChevronDown } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAccountFind from "@/hooks/useAccountFind";
import { useNavigate } from "react-router-dom";

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

// Rest of the interfaces remain the same
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

interface AccountFindByTelephoneProps {
  className?: string;
  containerClassName?: string;
}

const AccountFindByTelephone = ({
  className,
  containerClassName,
}: AccountFindByTelephoneProps) => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>(
    COUNTRY_CODES[0]
  );
  const { data, loading, error, setQuery } = useAccountFind();
  const [searchPerformed, setSearchPerformed] = React.useState(false);

  console.log("DATA:", data);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phoneNumber.replace(/\D/g, "");
    const formattedPhone = formatPhoneNumber(digits, selectedCountry);
    const query = {
      phone_number: formattedPhone,
    };
    console.log("QUERY:", query);

    setQuery(query);
    setSearchPerformed(true);
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

  const handleNavigate = (id: string) => {
    console.log("ID to pass to:", id);
    navigate(`./AccountView/${id}`);
  };

  interface ResultCardProps {
    account: Account;
  }

  const ResultCard = ({ account }: ResultCardProps) => (
    <div
      className={cn(
        "mt-4 p-3 rounded-lg border hover:shadow-lg transition-all duration-200 hover:ring-2 hover:ring-orange-500 cursor-pointer",
        isDarkMode
          ? "bg-slate-700 border-slate-600"
          : "bg-gray-50 border-gray-200"
      )}
      onClick={() => handleNavigate(account.id)}
    >
      <div className="space-y-2">
        <div className="flex justify-between">
          <span
            className={cn(
              "text-sm font-medium",
              isDarkMode ? "text-white" : "text-gray-700"
            )}
          >
            {account.name}
          </span>
          <span
            className={cn(
              "px-2 py-0.5 rounded text-xs",
              "bg-orange-100 text-orange-800"
            )}
          >
            {account.access_level}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            ID: {account.id}
          </span>
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            Phone: {account.phone_number}
          </span>
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            Location: {account.location}
          </span>
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            Created: {new Date(account.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={cn("relative", containerClassName)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center px-4 py-2 rounded-lg transition-colors",
          "bg-white border border-slate-200 hover:bg-gray-50",
          "focus:outline-none focus:ring-2 focus:ring-orange-500",
          isDarkMode &&
            "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white",
          className
        )}
      >
        <Search className="h-4 w-4 mr-2" />
        Find by Phone
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-96 z-50">
          <Card
            className={cn(
              "p-4 shadow-lg",
              isDarkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-slate-200"
            )}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  className={cn(
                    "block text-sm font-medium",
                    isDarkMode ? "text-white" : "text-gray-700"
                  )}
                >
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className={cn(
                        "flex items-center gap-1 px-2 py-2 border rounded-md",
                        "hover:bg-gray-50",
                        "focus:outline-none focus:ring-2 focus:ring-orange-500",
                        isDarkMode
                          ? "bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                          : "bg-white border-gray-300"
                      )}
                    >
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
                  <input
                    type="tel"
                    placeholder="XXX-XXX-XXXX"
                    className={cn(
                      "flex-1 px-3 py-2 border rounded-md",
                      "focus:outline-none focus:ring-2 focus:ring-orange-500",
                      "placeholder:text-gray-400",
                      isDarkMode
                        ? "bg-slate-700 border-slate-600 text-white placeholder:text-gray-500"
                        : "bg-white border-gray-300"
                    )}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    maxLength={12}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setSearchPerformed(false);
                    setPhoneNumber("");
                  }}
                  className={cn(
                    "px-4 py-2 rounded-md border",
                    isDarkMode
                      ? "border-slate-600 text-white hover:bg-slate-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={phoneNumber.length < 10}
                  className={cn(
                    "px-4 py-2 rounded-md text-white",
                    "transition-colors duration-200",
                    phoneNumber.length < 10
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-orange-600 hover:bg-orange-700"
                  )}
                >
                  Search
                </button>
              </div>
            </form>

            {searchPerformed && (
              <div className="mt-6">
                {loading ? (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : error ? (
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      isDarkMode
                        ? "bg-red-900/50 text-red-200"
                        : "bg-red-50 text-red-600"
                    )}
                  >
                    {error}
                  </div>
                ) : !data ? (
                  <div
                    className={cn(
                      "text-center py-4",
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    )}
                  >
                    No account found with this phone number
                  </div>
                ) : (
                  <ResultCard account={data.data || data} />
                )}
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export { AccountFindByTelephone };
