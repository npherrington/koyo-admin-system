import { useState } from "react";

interface NewUserInput {
  phone_number: string;
  password: string;
  name: string;
  sex: "male" | "female" | "other";
  location: string;
  language: string;
  num_children: number;
  date_of_birth: string;
}

interface ApiResponse {
  data?: any;
  error?: string;
}

const useAddNewUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any | null>(null);

  const addNewUser = async (userInput: NewUserInput): Promise<ApiResponse> => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(
        "https://j6424zsdt9.execute-api.eu-west-2.amazonaws.com/api/accounts/create",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInput),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create user");
      }

      setData(result);
      return { data: result };
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while creating the user";
      setError(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    addNewUser,
    loading,
    error,
    data,
  };
};

export { useAddNewUser };
