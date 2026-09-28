"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getFamilyMembers, getTasks } from "@/lib/data";
import { FamilyMember, Task, ScheduleItem } from "@/lib/types";
import { getMemberNames } from "@/lib/utils";

export default function MemberDetailPage() {
  const { id } = useParams();
  const [member, setMember] = useState<FamilyMember | null>(null);
  const [allMembers, setAllMembers] = useState<FamilyMember[]>([])
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const members = await getFamilyMembers();
      setAllMembers(members)
      const found = members.find((m) => m.id === Number(id));
      setMember(found || null);

      const allTasks = await getTasks();
      const memberTasks = allTasks.filter((task) =>
        task.schedule?.some((s) => s.assignedTo.includes(Number(id)))
      );
      setTasks(memberTasks);
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-6">
        <div className="text-center text-white">Member not found</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-6">
      <div className="max-w-4xl mx-auto">

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-8 text-center">
          <div className="text-6xl mb-3">{member.avatar}</div>
          <h1 className="text-3xl font-bold text-white">{member.name}</h1>
          <p className="text-white/60 text-lg">{member.role}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-white mb-4">📋 Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-white/50 text-center">No tasks assigned.</p>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border-b border-white/20 pb-3">
                  <Link href={`/tasks/${task.id}`} className="text-xl font-bold text-[#C48CB3] hover:underline">
                    {task.title}
                  </Link>
                  <div className="text-white/70 text-sm mt-2">
                    <strong>Schedule:</strong>
                    {task.schedule?.map((s: ScheduleItem) => (
                      <div key={s.day}>
                        {s.day}: {getMemberNames(s.assignedTo, allMembers)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
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