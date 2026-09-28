"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  return (
    <>
      <nav className="flex justify-end items-center px-8 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={ async() => {
              const response = await fetch("/api/auth/me");
              if (response.ok) {
                router.push("/dashboard");
                return;
              }

              setModalMode("login");
              setModalOpen(true);
            }}
            className="text-[#0D1E4C] hover:text-[#26415E] font-semibold transition"
          >
            Log in
          </button>

          <button
            onClick={() => {
              setModalMode("signup");
              setModalOpen(true);
            }}
            className="text-[#0D1E4C] hover:text-[#26415E] font-semibold transition"
          >
            Sign Up
          </button>
        </div>
      </nav>

      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
      />
    </>
  );
}