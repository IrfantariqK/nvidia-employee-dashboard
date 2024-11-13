import React, { useState } from "react";
import { useRouter } from "next/router";
import { LOGIN_MUTATION } from "@/lib/graphql"; // Import the LOGIN_MUTATION
import client from "@/lib/apolloClient"; // Import Apollo Client
import Layout from "@/components/Layout"; // Import Layout

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // State to hold error message
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { email, password },
      });
      const token = response.data.login.token;
      localStorage.setItem("token", token);
      router.push("/home");
    } catch (error) {
      console.error("Login error", error);
      setError("Invalid email or password. Please try again."); // Show error message
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-lg shadow-lg w-96">
          <h1 className="mb-6 text-3xl font-bold text-center">Login</h1>

          {/* Error Message */}
          {error && (
            <div className="mb-4 text-center text-red-500">{error}</div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full py-2 text-white transition duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Login
            </button>
          </div>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:text-blue-700">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
