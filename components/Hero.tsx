import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["700", "900"],
});

export default function Hero() {
  return (
    <section className="text-center py-20 px-4">
      <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold italic tracking-wide bg-gradient-to-r from-[#0D1E4C] from-65% to-[#C48CB3] to-85% bg-clip-text text-transparent drop-shadow-lg`}>
        FamilyFlow
      </h1>
    </section>
  );
}