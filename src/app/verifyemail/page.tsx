"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Extract token from URL
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // Verify when token is available
  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        setLoading(true);
        await axios.post("/api/users/verifyemail", { token });
        setVerified(true);
      } catch (error: unknown) {
        setError(true);
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.log("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl">Verify your Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `${token}` : "No token"}
      </h2>

      {loading && <p className="text-blue-500">Verifying...</p>}

      {verified && !loading && (
        <div className="text-green-500">
          Your email has been verified! You can now{" "}
          <Link href="/login" className="underline">
            login
          </Link>.
        </div>
      )}

      {error && !loading && (
        <div className="text-red-500">
          There was an error verifying your email. Please try again later.
        </div>
      )}
    </div>
  );
}
