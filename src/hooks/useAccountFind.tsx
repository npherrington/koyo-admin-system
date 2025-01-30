import { useState, useEffect } from "react";

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

type SearchQuery = Partial<Account>;

const useAccountFind = (initialQuery: SearchQuery = {}) => {
  const [query, setQuery] = useState<SearchQuery>(initialQuery);
  const [data, setData] = useState<Account | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if query is empty (no properties)
    const isQueryEmpty = Object.keys(query).length === 0;

    // Only fetch if there's actually a query
    if (!isQueryEmpty) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            "https://y6oi7rwyh5.execute-api.eu-west-2.amazonaws.com/api/accounts/find",
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
    }
  }, [query]);

  return {
    data,
    loading,
    error,
    setQuery,
  };
};

export default useAccountFind;
