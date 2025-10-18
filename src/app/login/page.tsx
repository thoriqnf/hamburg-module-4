"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie, isAuthenticated } from "@/lib/auth";
import { api } from "@/lib/api";
import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/products");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const data = await api.login(username, password);

      setCookie('accessToken', data.accessToken, 30);
      setCookie('refreshToken', data.refreshToken, 30);
      setCookie('username', data.username, 30);
      setCookie('user-data', JSON.stringify(data), 30);

      router.push("/products");

    } catch (error) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access our product catalog
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <LoginButton
              isLoading={isLoading}
              disabled={!username || !password}
            />
          </form>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">
              Demo Credentials
            </h3>
            <div className="text-xs text-gray-600 space-y-1">
              <p><strong>Username:</strong> emilys</p>
              <p><strong>Password:</strong> emilyspass</p>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          <p>This is a demo application using DummyJSON API</p>
        </div>
      </div>
    </div>
  );
}