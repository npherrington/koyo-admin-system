import { useState } from "react";

interface ResetPasswordError {
  message: string;
}

interface ApiErrorResponse {
  message?: string;
}

const API_URL =
  "https://j6424zsdt9.execute-api.eu-west-2.amazonaws.com/api/accounts/set_password";

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetPassword = async (
    phoneNumber: string,
    password: string
  ): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const formattedPhoneNumber = phoneNumber.startsWith("tel:")
        ? phoneNumber
        : `tel:${phoneNumber}`;

      const response = await fetch(API_URL, {
        method: "PATCH",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: formattedPhoneNumber,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = (await response.json()) as ApiErrorResponse;
        throw new Error(errorData.message || "Failed to reset password");
      }

      setIsSuccess(true);
    } catch (err) {
      // Type guard to check if the error is an Error instance
      if (err instanceof Error) {
        setError(err.message);
      } else if (typeof err === "string") {
        setError(err);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetPassword,
    isLoading,
    error,
    isSuccess,
  };
};
