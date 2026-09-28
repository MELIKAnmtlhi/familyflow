"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
       const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: JSON.stringify({ name, email, password })
       })

       const data = await res.json();
       
       if (!res.ok) {
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
       }

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userId", data.userId)
      router.push("/dashboard");
    } catch (err) {
      console.log(err)
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center">
      <div className="w-80">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 text-base rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
            placeholder="Full Name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 text-base rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 text-base rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
            placeholder="Password"
            required
          />
          {error && (
            <div className="text-red-300 text-sm text-center bg-red-500/20 p-2 rounded-lg">
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] py-2 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-white/60 text-sm mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-[#C48CB3] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}