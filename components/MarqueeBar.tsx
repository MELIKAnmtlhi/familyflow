"use client";

export default function MarqueeBar() {
  const text = "💜 Welcome to FamilyFlow — Manage tasks, expenses, events & memories, all in one place! ✨";

  return (
    <div className="w-full bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="mx-8 text-white text-sm font-medium">{text}</span>
        <span className="mx-8 text-white text-sm font-medium">{text}</span>
        <span className="mx-8 text-white text-sm font-medium">{text}</span>
        <span className="mx-8 text-white text-sm font-medium">{text}</span>
      </div>
    </div>
  );
}