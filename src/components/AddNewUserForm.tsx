import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAddNewUser } from "../hooks/useAddNewUser";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, ChevronDown } from "lucide-react";

interface NewUserFormProps {
  onClose: () => void;
}

type Sex = "male" | "female" | "other";

interface UserFormData {
  phone_number: string;
  password: string;
  name: string;
  sex: Sex;
  location: string;
  language: string;
  num_children: number;
  date_of_birth: string;
}

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

const NewUserForm: React.FC<NewUserFormProps> = ({ onClose }) => {
  const { isDarkMode } = useTheme();
  const { addNewUser, loading, error } = useAddNewUser();
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    COUNTRY_CODES[0]
  );
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    phone_number: "",
    password: "",
    name: "",
    sex: "female" as Sex,
    location: "",
    language: "",
    num_children: 0,
    date_of_birth: "",
  });

  // Validation function to check if all required fields are filled
  const validateForm = () => {
    const isPhoneValid = formData.phone_number.length > 0;
    const isPasswordValid = formData.password.length >= 6; // Minimum 6 characters for password
    const isNameValid = formData.name.trim().length > 0;
    const isLocationValid = formData.location.trim().length > 0;
    const isLanguageValid = formData.language.trim().length > 0;
    const isDateValid = formData.date_of_birth.length > 0;
    const isSexValid = ["male", "female", "other"].includes(formData.sex);

    return (
      isPhoneValid &&
      isPasswordValid &&
      isNameValid &&
      isLocationValid &&
      isLanguageValid &&
      isDateValid &&
      isSexValid
    );
  };

  // Update form validity whenever form data changes
  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

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

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const digits = value.replace(/\D/g, "");

    let formatted = digits;
    if (selectedCountry.code === "+44") {
      if (digits.length > 4) {
        formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
      }
    } else {
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
    const formattedPhone = formatPhoneNumber(digits, selectedCountry);
    setFormData((prev) => ({ ...prev, phone_number: formattedPhone }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "num_children" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSexChange = (value: Sex) => {
    setFormData((prev) => ({
      ...prev,
      sex: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    const response = await addNewUser(formData);
    if (!response.error) {
      onClose();
    }
  };

  const handleCreateClick = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Add New User</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number *</Label>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 px-2 py-2 border rounded-md hover:bg-orange-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-500">
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
                        <span className="ml-2">{country.code}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  type="tel"
                  placeholder="XXX-XXX-XXXX"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  maxLength={12}
                  required
                  className="flex-1"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth *</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Sex *</Label>
              <Select onValueChange={handleSexChange} value={formData.sex}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sex" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Input
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="num_children">Number of Children</Label>
              <Input
                id="num_children"
                name="num_children"
                type="number"
                min="0"
                value={formData.num_children}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </form>
      </CardContent>
      <CardFooter className="flex justify-end space-x-4 py-2">
        <Button
          className={`${
            isDarkMode
              ? "border border-slate-400 bg-slate-500 text-black hover:bg-orange-600 hover:text-white"
              : "border border-slate-600 bg-slate-200 text-black hover:bg-orange-600 hover:text-white"
          }`}
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          onClick={handleCreateClick}
          disabled={loading || !isFormValid}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          {loading ? "Creating..." : "Create User"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewUserForm;
