"use client";
import { signIn } from "next-auth/react";

import { useState } from "react";
import { useRouter } from "next/navigation";

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
};

export default function AuthModal({
  isOpen,
  onClose,
  mode,
}: AuthModalProps) {
  const router = useRouter();

//   const [isLogin, setIsLogin] = useState(mode === "login");
 const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // هماهنگ شدن Modal با Navbar
//   useEffect(() => {
//     setIsLogin(mode === "login");

//     setName("");
//     setEmail("");
//     setPassword("");

//     setError("");
//     setSuccess("");
//   }, [mode, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isLogin) {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Login failed.");
          return;
        }

        if (data.success) {
          onClose();
          router.push("/dashboard");
          router.refresh();
        }

        return;
      }

      
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      if (data.success) {
        setSuccess("Account created successfully. Please log in.");

        // خالی کردن فرم
        setName("");
        setEmail("");
        setPassword("");

        // بعد از ثبت نام، فرم به Login تبدیل میشه
        setTimeout(() => {
          setSuccess("");
        //   setIsLogin(true);
        }, 1200);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    // setIsLogin(!isLogin);
    onClose();

    setName("");
    setEmail("");
    setPassword("");

    setError("");
    setSuccess("");
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#E8E4DC] rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
       
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-[#E8E4DC]">
          <div className="w-32 h-32 rounded-full border-8 border-[#26415E] flex items-center justify-center relative">
            <div className="absolute w-3 h-3 bg-[#26415E] rounded-full top-10 left-8" />

            <div className="absolute w-3 h-3 bg-[#26415E] rounded-full top-10 right-8" />

            <div className="w-16 h-8 border-b-4 border-[#26415E] rounded-b-full" />
          </div>
        </div>
        
        <div className="p-8 md:p-12 bg-white">
          <h2 className="text-2xl font-bold text-[#0D1E4C] mb-6">
            {isLogin
              ? "Log in to your account"
              : "Sign up to your account"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {!isLogin && (
              <div>
                <label className="text-xs text-gray-500 uppercase">
                  Name *
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#26415E] text-gray-800"
                  placeholder="Your name"
                  disabled={loading}
                />
              </div>
            )}

            <div>
              <label className="text-xs text-gray-500 uppercase">
                Email *
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#26415E] text-gray-800"
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>

          
            <div>
              <label className="text-xs text-gray-500 uppercase">
                Password *
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#26415E] text-gray-800"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

           {error && (
              <p className="text-sm text-red-500">
                {error}
              </p>
            )}

           
            {success && (
              <p className="text-sm text-green-600">
                {success}
              </p>
            )}

          
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#26415E] hover:bg-[#0D1E4C] disabled:opacity-60 text-white py-3 rounded-lg font-semibold transition mt-4"
            >
              {loading
                ? "Please wait..."
                : isLogin
                ? "Log In"
                : "Create Account"}
            </button>
          </form>

          <div className="mt-6">
            <p className="text-center text-xs text-gray-400 mb-3">
              Or continue with
            </p>

            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard"})}
              className="w-full flex items-center justify-center gap-3 border border-gray-300 py-3 rounded-lg hover:bg-[#26415E] hover:border-blue-500 transition"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />

                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />

                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>

              <span className="text-gray-500 font-medium">
                Google
              </span>
            </button>
          </div>

        
          <p className="text-center text-sm text-gray-500 mt-6">
            {isLogin
              ? "Don't have an account? "
              : "Already a member? "}

            <button
              type="button"
              onClick={switchMode}
              className="text-[#26415E] font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Log in now"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}