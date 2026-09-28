import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] mt-20">
      <div className="w-full px-10 py-4 flex justify-start items-center pl-32">
        <Link
          href="/about"
          className="text-[#C48CB3] hover:text-[#0D1E4C]/80 font-bold text-xl transition"
        >
          About Me
        </Link>
      </div>
    </footer>
  );
}