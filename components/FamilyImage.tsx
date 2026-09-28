import Image from "next/image";

export default function FamilyImage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src="/family.jpg"
          alt="Happy family"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1E4C]/50 via-transparent to-transparent" />
      </div>
    </div>
  );
}