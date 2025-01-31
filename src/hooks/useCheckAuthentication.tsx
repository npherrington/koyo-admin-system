import { useState } from "react";

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

interface AuthError {
  message: string;
  status?: number;
}

interface AuthHookReturn {
  authenticate: (username: string, password: string) => Promise<AuthResponse>;
  token: AuthResponse | null;
  error: AuthError | null;
  isLoading: boolean;
}

const useCheckAuthentication = (): AuthHookReturn => {
  const [token, setToken] = useState<AuthResponse | null>(null);
  const [error, setError] = useState<AuthError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const authenticate = async (
    username: string,
    password: string
  ): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);

    const formData = new URLSearchParams({
      grant_type: "password",
      username: `tel:+${username}`,
      password: password,
      scope: "",
      client_id: "string",
      client_secret: "string",
    });

    console.log("formData:", formData);

    try {
      const response = await fetch(
        "https://j6424zsdt9.execute-api.eu-west-2.amazonaws.com/api/token",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      console.log("response:", response);
      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.status}`);
      }

      const data = (await response.json()) as AuthResponse;
      setToken(data);
      return data;
    } catch (err) {
      const error: AuthError = {
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
      };
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    authenticate,
    token,
    error,
    isLoading,
  };
};

export default useCheckAuthentication;
