// src/utils/auth.ts

export const isAuthenticated = (): boolean => {
  return localStorage.getItem("authToken") !== null; // Check if the token exists
};

export const signIn = (token: string): void => {
  localStorage.setItem("authToken", token); // Store the token on successful login
};

export const signOut = (): void => {
  localStorage.removeItem("authToken"); // Remove the token on logout
};
