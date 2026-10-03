import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700", "900"],
});

export default function Hero() {
  return (
    <section className="text-center py-20 px-4">
      <h1 className={`${playfair.className} text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold italic tracking-wide bg-gradient-to-r from-[#0D1E4C] drop-shadow-lg`}>
        FamilyFlow
      </h1>
    </section>
  );
}