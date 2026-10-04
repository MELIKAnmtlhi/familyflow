"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface Task {
  _id: string;
  title: string;
  isCompleted: boolean;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasksPercent, setTasksPercent] = useState(0);
  const [budgetPercent, setBudgetPercent] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const [usedBudget, setUsedBudget] = useState<number>(0);
  const [remainingBudget, setRemainingBudget] = useState(0);

useEffect(() => {
  const loadData = async () => {
    try {
      const tasksRes = await fetch("/api/tasks");
      const tasks = await tasksRes.json();
    

      const budgetRes = await fetch("/api/budget");
      const budget = await budgetRes.json();

      const completed = tasks.filter((t: Task) => t.isCompleted).length;
      const tasksPercent = tasks.length === 0 ? 0 : Math.round((completed / tasks.length) * 100);
      const budgetPercent = budget.total === 0 ? 0 : Math.round((budget.used / budget.total) * 100);

      setTasksPercent(tasksPercent);
      setBudgetPercent(budgetPercent);
      setCompletedCount(completed);
      setPendingCount(tasks.length - completed);
      setTotalBudget(budget.total);
      setUsedBudget(budget.used);
      setRemainingBudget(budget.total - budget.used);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsLoading(false);
    }
  };

  loadData();
}, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-tr from-[#26415E] via-[#C48CB3] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </main>
    )
  }
  
  return (
    <main className="relative min-h-screen flex flex-col bg-gradient-to-br from-[#26415E] via-[#C48CB3] to-[#0D1E4C]">
      <header className="sticky top-0 z-50 flex justify-between items-center p-6 border-b border-white/20 backdrop-blur-md">
       <h1 className="text-2xl font-bold italic mr-2">
         <span className="text-[#0D1E4C]">FamilyFlow</span>
       </h1>
       <div className="flex items-center justify-end gap-4 ">
      <Link
         href="/members"
         className="bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-8 py-4 rounded-full text-base font-bold transition shadow-md"
      >
        👨‍👩‍👧‍👦Members
     </Link>
      
         <button
            onClick={ async() => {
              await fetch("api/auth/logout", { method: "POST"});
              signOut({ callbackUrl: "/"});
            }}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full text-base font-bold transition shadow-md"
          >
        🚪Logout
       </button>
      </div>
      </header>
       
      <div className="flex-1 flex flex-col item-center justify-center px-4 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full max-w-10xl">
          <div className="bg-[#0D1E4C]/30 backdrop-blur-md rounded-lg p-6 shadow-lg border border-[#C48CB3]/30">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/30 pb-2">
              📊 Status
            </h2>
            <div className="mb-8">
             <h3 className="text-xl font-semibold text-white mb-3">✨ Tasks</h3>
             <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-[#E5C9D7] mb-1">
                    <span>Completed ({completedCount})</span>
                    <span>{tasksPercent}%</span>
                   </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${tasksPercent}%`}}></div>
                </div>
             </div>
                <div>
                  <div className="flex justify-between text-sm text-[#E5C9D7] mb-1">
                    <span>Pending ({pendingCount})</span>
                    <span>{100 - tasksPercent}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-[#C48CB3] h-2 rounded-full" style={{ width: `${100 - tasksPercent}%`}}></div>
                  </div>
                </div>
              </div>
            </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-3">💰 Budget</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm text-[#E5C9D7] mb-1">
                  <span>Used</span>
                  <span>{usedBudget?.toLocaleString() ?? '0'} T</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full " style={{ width: `${budgetPercent}%`}}></div>
                </div>
              </div>
     
                <div>
                  <div className="flex justify-between text-sm text-[#E5C9D7] mb-1">
                    <span>Remaining</span>
                    <span>{remainingBudget?.toLocaleString() ?? '0'} T</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-[#C48CB3] h-2 rounded-full" style={{ width: `${100 - budgetPercent}%`}}></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-center text-xs text-[#83A6CE]">
                Total Budget: {totalBudget?.toLocaleString() ?? '0'} T
              </div>
            </div>
            
            <Link
                href="/reports"
                   className="mt-4 w-full bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] py-2 rounded-lg font-bold transition block text-center"
            >
               📈 View Full Report
            </Link>
             </div>

          <div className="bg-[#0D1E4C]/30 backdrop-blur-md rounded-lg p-6 shadow-lg border border-[#C48CB3]/30">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/30 pb-2">
              ✨ Features
            </h2>
            <div className="space-y-4">
              {[
                { title: "Tasks & To-Do Lists", desc: "Manage daily tasks, set priorities and deadlines", icon: "✅", link: "/tasks" },
                { title: "Events & Family Calendar", desc: "Shared calendar for events, celebrations and appointments", icon: "📅", link: "/calendar" },
                { title: "Shared Budget & Expenses", desc: "Track expenses, monthly budgeting and reporting", icon: "💰", link: "/budget" },
                { title: "Reminders & Notifications", desc: "Smart reminders, notofications and internal messaging", icon: "🔔", link: "/notifications" }
              ].map((item, index) => (
                <Link key={index} href={item.link as string} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="font-bold text-[#E5C9D7]">{item.title}</h3>
                    <p className="text-sm text-[#83A6CE]">{item.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
       </div>
      </div>
      
      <footer className="w-full text-center py-6 text-[#83A6CE] text-sm border-t border-white/20">
        Designed for better family life💙
      </footer>
    </main>
  );
}