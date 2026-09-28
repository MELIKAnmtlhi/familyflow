"use client";

import FamilyImage from "@/components/FamilyImage";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MarqueeBar from "@/components/MarqueeBar";
import Navbar from "@/components/Navbar";
import Values from "@/components/Values";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#26415E] via-[#C48CB3] to-[#0D1E4C]">
      
      <MarqueeBar />
      <Navbar />
      <Hero />
      <FamilyImage />
      <Values />
      <Footer />

    </main>
  );
}