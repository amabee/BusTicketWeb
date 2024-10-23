"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Bus, AlertCircle, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const DriverAuthPage = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      if (sessionStorage.getItem("driver")) {
        window.location.href = "/Driver/Dashboard";
      } else {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-4">
          <Bus className="h-12 w-12 text-blue-600" />
          <div className="flex items-center space-x-2">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <span className="text-lg font-medium text-gray-700">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  const url = "http://localhost/apibus/driver/auth.php";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (!loginEmail || !loginPassword) {
        setError("Please fill in all fields");
      } else {
        login();
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (
        !signupEmail ||
        !signupPassword ||
        !firstName ||
        !lastName ||
        !signupConfirmPassword ||
        !address
      ) {
        setError("Please fill in all fields");
        return;
      }

      if (signupPassword.length < 8) {
        alert("Password must be at least 8 characters long");
        return;
      }
      if (signupPassword !== signupConfirmPassword) {
        setError("Passwords do not match");
        return;
      }

      signup();

      setIsLoading(false);
    }, 1000);
  };

  const login = async () => {
    try {
      const res = await axios.get(url, {
        params: {
          operation: "login",
          json: JSON.stringify({
            username: loginEmail,
            password: loginPassword,
          }),
        },
      });

      if (res.status !== 200) {
        return alert("Connection Error");
      }

      if (res.data.success) {
        sessionStorage.setItem("driver", JSON.stringify(res.data.success));
        window.location.href = "/Driver/Dashboard";
      } else {
        return alert(res.data.error);
      }
    } catch (error) {
      alert(error);
    }
  };

  const signup = async () => {
    const formData = new FormData();
    formData.append("operation", "signup");
    formData.append(
      "json",
      JSON.stringify({
        password: signupConfirmPassword,
        firstname: firstName,
        lastname: lastName,
        email: signupEmail,
        address: address,
      })
    );

    const res = await axios({
      url: url,
      method: "POST",
      data: formData,
    });

    try {
      if (res.status !== 200) {
        return alert(res.statusText);
      }

      if (res.data.success) {
        alert("User account successfully created");
        setSignupEmail("");
        setSignupPassword("");
        setfirstName("");
        setlastName("");
        setSignupConfirmPassword("");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-4">
      {/* Logo Section */}
      <div className="flex items-center mb-8">
        <Bus className="h-8 w-8 text-blue-600" />
        <span className="ml-2 text-2xl font-bold text-gray-900">BusGo</span>
      </div>

      <Card className="w-full max-w-md">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Welcome back
              </CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
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

                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <Button
                      variant="link"
                      className="px-0 font-normal text-sm text-blue-600"
                    >
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember" className="font-normal">
                    Remember me
                  </Label>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
            </CardContent>
          </TabsContent>

          <TabsContent value="signup">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">
                Create an account
              </CardTitle>
              <CardDescription className="text-center">
                Enter your details to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signup-name">Firstname</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setfirstName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-name">Lastname</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-address">Address</Label>
                  <Input
                    id="signup-address"
                    type="text"
                    placeholder="Carmen, CDO"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">
                    Confirm Password
                  </Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create account"}
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default DriverAuthPage;
