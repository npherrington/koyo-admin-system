import { useState, useEffect } from "react";

interface SearchResponse {
  // Add your API response type here
  // This is a placeholder - update according to your API response structure
  data: Account[];
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

type SearchQuery = Partial<Account> | Record<string, never>;

const useAccountSearch = (initialQuery: SearchQuery = {}) => {
  const [query, setQuery] = useState<SearchQuery>(initialQuery);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://l0wrj6xw5i.execute-api.eu-west-2.amazonaws.com/api/accounts/search",
          {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return {
    data,
    loading,
    error,
    setQuery,
  };
};

export default useAccountSearch;
