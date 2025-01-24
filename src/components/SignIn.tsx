import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Lock, Mail } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { signIn } from "../utils/auth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login logic here
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // Reset error state
    setError("");

    console.log("Email:", email);
    console.log("Password:", password);
    if (email == "supervisor@koyohealthtech.com" && password == "supervisor") {
      signIn("fake-jwt-token");
      navigate("/Dashboard");
    } else {
      setError("Incorrect email and/or password fields");
    }
  };

  //   const handleSubmit = () => {};

  const handleForgotPassword = () => {
    setError("Please contact support for a new password");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md space-y-4 p-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-orange-600">Koyo Admin</h1>
          <p>Healthcare Management System</p>
        </div>

        {/* Login Card */}
        <Card>
          <CardHeader>
            <ThemeToggle className="px-1 py-0 items-center justify-end" />
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to access your admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="admin@koyohealth.com"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
                // onClick={handleSubmit}
              >
                Sign In
              </button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <button
              className="text-sm text-gray-600 hover:text-orange-600"
              onClick={handleForgotPassword}
            >
              Forgot password?
            </button>
            {/* <button className="text-sm text-gray-600 hover:text-orange-600">
              Contact support
            </button> */}
          </CardFooter>
        </Card>

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>Secure login • HIPAA compliant • 2FA enabled</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
