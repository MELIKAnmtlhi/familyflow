"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getFamilyMembers, addFamilyMember, deleteFamilyMember } from "@/lib/data";
import { FamilyMember } from "@/lib/types";

export default function MembersPage() {
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [newMember, setNewMember] = useState({ name: "", role: "", avatar: "👤" });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
     const loadMembers = async () => {
    const data = await getFamilyMembers();
    setMembers(data);
    setLoading(false);
  };
     loadMembers();
  }, []);

  const handleAdd = async () => {
    if (!newMember.name.trim()) return;
   const memberWhiteoutId = {
    name: newMember.name,
    role: newMember.role,
    avatar: newMember.avatar
   };

   await addFamilyMember(memberWhiteoutId)
    setNewMember({ name: "", role: "", avatar: "👤" });
    const data = await getFamilyMembers();
    setMembers(data);
  };

  const handleDelete = async (id: string) => {
    await deleteFamilyMember(id);
   const data = await getFamilyMembers();
    setMembers(data);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold text-[#C48CB3] mb-6">Family Members 👨‍👩‍👧‍👦</h1>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Add New Member</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              placeholder="Name"
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
            />
            <input
              type="text"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              placeholder="Role (e.g., father, mother, son)"
              className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
            />
            <button
              onClick={handleAdd}
              className="bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-6 py-2 rounded-lg font-bold transition"
            >
              + Add
            </button>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Member List</h2>
          <div className="space-y-3">
            {members.length === 0 ? (
              <p className="text-center text-white/50">No members yet. Add one!</p>
            ) : (
              members.map((member) => (
                <Link
                  href={`/members/${member._id}`}
                  key={member._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{member.avatar}</span>
                    <div>
                      <p  className="text-white font-semibold">{member.name}</p>
                      <p className="text-white/60 text-sm">{member.role}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) =>{ 
                      e.preventDefault();
                      handleDelete((member._id))
                    }}
                    className="text-red-400 hover:text-red-300 transition text-sm px-2 py-1 rounded hover:bg-white/10"
                  >
                    ✕ Delete
                  </button>
                </Link>
              ))
            )}
          </div>
        </div>
           <div className="mt-8 flex justify-start">
          <Link
            href="/dashboard"
            className="bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-5 py-2 rounded-full text-sm font-semibold transition shadow-md"
          >
            ← Back to Tasks
          </Link>
        </div>
      </div>
    </main>
  );
}

//  const loadMembers = async () => {
//     const data = await getFamilyMembers();
//     setMembers(data);
//     setLoading(false);
//   };