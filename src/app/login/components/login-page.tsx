"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { LogIn, Mail, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginForm } from "@/schema/auth";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginForm) => {
    setError("");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    console.log(res);
    if (res?.error) setError("Invalid email or password. Please try again.");
    if (res?.ok && !res.error) window.location.href = "/";
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* Animated Background Pattern */}
      <div className="bg-grid-slate-100 absolute inset-0 -z-10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">
            Welcome Back
          </h1>
          <p className="text-slate-600">Sign in to your account to continue</p>
        </div>

        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-center text-2xl font-semibold text-slate-800">
              Sign In
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-slate-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <Mail className="absolute top-2/4 left-3 h-4 w-4 -translate-y-2/4 text-slate-400" />
                          <Input
                            type="text"
                            placeholder="Enter your email"
                            className="h-12 border-slate-200 pl-10 focus:border-blue-500 focus:ring-blue-500/20"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-slate-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <Lock className="absolute top-2/4 left-3 h-4 w-4 -translate-y-2/4 text-slate-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="h-12 border-slate-200 pr-10 pl-10 focus:border-blue-500 focus:ring-blue-500/20"
                            {...field}
                          />
                          <Button
                            variant={"ghost"}
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-2/4 right-3 -translate-y-2/4 text-slate-400 hover:text-slate-600"
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="h-12 w-full bg-gradient-to-r from-blue-600 to-indigo-600 font-medium text-white shadow-lg hover:from-blue-700 hover:to-indigo-700"
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <p className="text-slate-600">
                {"Don't have an account? "}
                <Link
                  href="/register"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          Protected by industry-standard security measures
        </p>
      </div>
    </div>
  );
}
