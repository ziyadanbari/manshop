"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  UserPlus,
  Mail,
  Lock,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { api } from "@/trpc/react";
import { registerSchema, type RegisterForm } from "@/schema/auth";

export default function RegisterPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const registerUser = api.user.register.useMutation();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    setError("");
    setSuccess("");
    try {
      await registerUser.mutateAsync(data);
      setSuccess("Registration successful! You can now log in.");
      form.reset();
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      {/* Animated Background Pattern */}
      <div className="bg-grid-slate-100 absolute inset-0 -z-10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">
            Create Account
          </h1>
          <p className="text-slate-600">Join us today and get started</p>
        </div>

        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-center text-2xl font-semibold text-slate-800">
              Sign Up
            </CardTitle>
            <CardDescription className="text-center text-slate-600">
              Enter your information to create your account
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
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium text-slate-700">
                        Username
                      </FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <User className="absolute top-2/4 left-3 h-4 w-4 -translate-y-2/4 text-slate-400" />
                          <Input
                            type="text"
                            placeholder="Enter your username"
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
                            type="email"
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
                            type="password"
                            placeholder="Create a password"
                            className="h-12 border-slate-200 pl-10 focus:border-blue-500 focus:ring-blue-500/20"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {error && (
                  <Alert className="border-red-200 bg-red-50">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-700">
                      {success}
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
                      Creating Account...
                    </div>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-slate-500">
          By creating an account, you agree to our{" "}
          <Link href="/terms" className="underline hover:text-slate-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline hover:text-slate-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
