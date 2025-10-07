"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* 🔹 Navbar */}
      <nav className="w-full bg-white shadow-sm py-4 px-8 flex justify-between items-center">
        {/* Logo / Title */}
        <div className="text-xl font-semibold text-gray-800 tracking-tight">
          Authentication System
        </div>

        {/* Right Side: Auth Buttons */}
        <div className="flex gap-3">
          <Link
            href="/login"
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* 🔹 Hero Section */}
      <main className="flex flex-col items-center justify-center flex-1 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Secure User Authentication System
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mb-8">
          A modern authentication platform built with Next.js, Tailwind CSS, and
          JWT. Manage user registration, login, and email verification with
          ease.
        </p>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            href="/about"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Learn More
          </Link>
        </div>
      </main>

      {/* 🔹 Footer */}
      <footer className="bg-white border-t py-4 text-center text-gray-500 text-sm">
        Authentication © {new Date().getFullYear()} — All rights reserved.
      </footer>
    </div>
  );
}
