import React, { useState } from "react";
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
import Sidebar from "./ui/side-bar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    // Reset error state
    setError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-4 p-6">
        {/* Logo and Title */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold text-orange-600">Koyo Admin</h1>
          <p className="text-gray-500">Healthcare Management System</p>
        </div>

        <Sidebar activeSection="Sign In" />
        {/* Login Card */}
        <Card className="bg-slate-50">
          <CardHeader>
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
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
              >
                Sign In
              </button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <button className="text-sm text-gray-600 hover:text-orange-600">
              Forgot password?
            </button>
            <button className="text-sm text-gray-600 hover:text-orange-600">
              Contact support
            </button>
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
