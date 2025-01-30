import { useState } from "react";

interface EditAccountResponse {
  data: Account;
}

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

interface EditAccountPayload {
  account_id: string;
  changes: Partial<Account>;
}

const useEditAccount = () => {
  const [data, setData] = useState<EditAccountResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const editAccount = async (payload: EditAccountPayload) => {
    setLoading(true);
    setError(null);

    console.log("payload:", payload);
    try {
      const response = await fetch(
        "https://y6oi7rwyh5.execute-api.eu-west-2.amazonaws.com/api/accounts/update",
        {
          method: "PATCH",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    editAccount,
    data,
    loading,
    error,
  };
};

export default useEditAccount;
