"use client";

import { Task } from "@/lib/types";
import Link from "next/link";



export default function DefaultTask({ task }: { task: Task }) {
  return (
    <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-6">
        <div className="max-w-6xl mx-auto">


        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
          <h1 className="text-3xl font-bold text-white mb-4">{task.title}</h1>
          <p className="text-white/60">This is a general task page.</p>
          <p className="text-white/40 text-sm mt-4">No specific layout defined for {task.title}.</p>
        </div>
       <div className="mt-8 flex justify-start">
        <Link href="/tasks" className="bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-5 py-2 rounded-full text-sm font-semibold transition shadow-md">
          ← Back to Tasks
        </Link>
        </div>
      </div>
    </main>
  );
}