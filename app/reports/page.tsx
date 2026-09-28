"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

type ChartData = {
  name: string;
  value: number;
  fill: string;
};

type Task = {
  isCompleted: boolean;
};

export default function ReportsPage() {
  const [tasksData, setTasksData] = useState<ChartData[]>([]);
  const [budgetData, setBudgetData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // ✅ تسک‌ها
        const tasksRes = await fetch("/api/tasks");
        const tasks: Task[] = await tasksRes.json();
        const completed = tasks.filter((t) => t.isCompleted).length;
        const pending = tasks.length - completed;

        setTasksData([
          { name: "Completed", value: completed, fill: "#C48CB3" },
          { name: "Pending", value: pending, fill: "#83A6CE" },
        ]);

      // ✅ بودجه و هزینه‌ها از API
           const [budgetRes, expensesRes] = await Promise.all([
             fetch("/api/budget"),
             fetch("/api/expenses"),
           ]);
           const budget = await budgetRes.json();
           const expenses = await expensesRes.json();

           const total = budget.total || 0;
           const used = expenses.reduce(
             (sum: number, e: { amount: number }) => sum + e.amount,
             0
           );
           const remaining = total - used;

        setBudgetData([
          { name: "Used", value: used, fill: "#C48CB3" },
          { name: "Remaining", value: remaining > 0 ? remaining : 0, fill: "#83A6CE" },
        ]);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-8">📊 Reports</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
            <h2 className="text-white text-xl font-bold mb-4">💰 Budget</h2>
            {loading ? (
              <p className="text-white/60">Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(13, 30, 76, 0.9)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {budgetData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Tasks Chart */}
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
            <h2 className="text-white text-xl font-bold mb-4">📊 Tasks</h2>
            {loading ? (
              <p className="text-white/60">Loading...</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tasksData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#fff" />
                  <YAxis stroke="#fff" />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(13, 30, 76, 0.9)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {tasksData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-start">
          <Link
            href="/dashboard"
            className="bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-5 py-2 rounded-full text-sm font-semibold transition shadow-md"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}