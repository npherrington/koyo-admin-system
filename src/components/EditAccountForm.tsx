import React, { useState } from "react";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useEditAccount from "@/hooks/useEditAccount";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

interface EditAccountOverlayProps {
  account: Account;
  onSuccess?: () => void;
}

const EditAccountOverlay = ({
  account,
  onSuccess,
}: EditAccountOverlayProps) => {
  const { editAccount, loading, error } = useEditAccount();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Account>>({
    name: account.name,
    phone_number: account.phone_number,
    date_of_birth: account.date_of_birth.split("T")[0],
    sex: account.sex,
    location: account.location,
    language: account.language,
    num_children: account.num_children,
  });

  // Track which fields have been modified
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const initialValue = account[name as keyof Account];
    const newValue = name === "num_children" ? parseInt(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Add or remove field from modified set based on whether it differs from initial value
    if (newValue !== initialValue) {
      setModifiedFields((prev) => new Set(prev.add(name)));
    } else {
      setModifiedFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    const initialValue = account[name as keyof Account];

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (value !== initialValue) {
      setModifiedFields((prev) => new Set(prev.add(name)));
    } else {
      setModifiedFields((prev) => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create an object containing only the modified fields
    const changes = Array.from(modifiedFields).reduce(
      (acc, field) => ({
        ...acc,
        [field]: formData[field as keyof typeof formData],
      }),
      {}
    );

    try {
      await editAccount({
        account_id: account.id,
        changes,
      });
      setOpen(false);
      onSuccess?.();
    } catch (err) {
      console.error("Failed to update account:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Edit className="w-4 h-4 mr-2" />
          Edit Account
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Account Information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sex">Sex</Label>
              <Select
                name="sex"
                value={formData.sex}
                onValueChange={(value) => handleSelectChange("sex", value)}
              >
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
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                name="language"
                value={formData.language}
                onChange={handleInputChange}
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
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccountOverlay;
