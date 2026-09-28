"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getExpenses, addExpense, deleteExpense } from "@/lib/data";
import { getBudgetSettings, updateBudgetSettings } from "@/lib/data";
import { Expense } from "@/lib/types";

export default function BudgetPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [budgetTotal, setBudgetTotal] = useState<number | null>(null);
  const [newBudgetInput, setNewBudgetInput] = useState<string>("");
  const [showBudgetInput, setShowBudgetInput] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    paidBy: "",
    description: "",
  });

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";  

  const loadData = async () => {
    try {
      const [expensesData, budgetData] = await Promise.all([
        getExpenses(),
        getBudgetSettings(userId),
      ]);
      setExpenses(expensesData);
      if (budgetData && budgetData.total > 0) {
        setBudgetTotal(budgetData.total);
        setShowBudgetInput(false)
      } else {
        setBudgetTotal(0);
        setShowBudgetInput(true);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setShowBudgetInput(true)
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    const loadData = async () => {
    try {
      const [expensesData, budgetData] = await Promise.all([
        getExpenses(),
        getBudgetSettings(userId),
      ]);
      setExpenses(expensesData);
      if (budgetData && budgetData.total > 0) {
        setBudgetTotal(budgetData.total);
        setShowBudgetInput(false)
      } else {
        setBudgetTotal(0);
        setShowBudgetInput(true);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setShowBudgetInput(true)
    } finally {
      setLoading(false);
    }
  };
      loadData()
    }, [userId]);

  const handleSetBudget = async () => {
    const amount = Number(newBudgetInput);
    if (isNaN(amount) || amount <= 0) return;
    try {
      await updateBudgetSettings( userId ,amount );
      setBudgetTotal(amount);
      setShowBudgetInput(false);
      setNewBudgetInput("");
    } catch (error) {
      console.error("Error setting budget:", error);
    }
  };

  const handleAddExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category || !formData.date || !formData.paidBy) return;

    try {
      await addExpense({
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        date: formData.date,
        paidBy: formData.paidBy,
        description: formData.description,
      });
      setFormData({ title: "", amount: "", category: "", date: "", paidBy: "", description: "" });
      loadData();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteExpense(id);
      loadData();
    }
  };

  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = (budgetTotal || 0) - totalSpent;

  const byMember: Record<string, number> = {};
  expenses.forEach((e) => {
    byMember[e.paidBy] = (byMember[e.paidBy] || 0) + e.amount;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (showBudgetInput) {
    return (
      <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center p-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl max-w-md w-full text-center">
          <h1 className="text-3xl font-bold text-white mb-4">💰 Set Your Budget</h1>
          <p className="text-white/60 mb-6">Enter your total monthly budget</p>
          <input
            type="number"
            placeholder="e.g. 50000000"
            value={newBudgetInput}
            onChange={(e) => setNewBudgetInput(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3] text-center text-xl"/>
          <button
            onClick={handleSetBudget}
            className="mt-4 w-full bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] py-3 rounded-lg font-bold transition text-lg"
          >
            Set Budget
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-6">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D1E4C]">Shared Budget 💰 </h1>
        </div>

        {/* خلاصه بودجه */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
            <p className="text-white/60 text-sm">Total Budget</p>
            <p className="text-2xl font-bold text-white">{budgetTotal?.toLocaleString() || 0} T</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
            <p className="text-white/60 text-sm">Spent</p>
            <p className="text-2xl font-bold text-white">{totalSpent.toLocaleString()} T</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center">
            <p className="text-white/60 text-sm">Remaining</p>
            <p className="text-2xl font-bold text-white">{remaining.toLocaleString()} T</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* فرم افزودن هزینه */}
          <div className="lg:col-span-1 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">➕ Add Expense</h2>
            <form onSubmit={handleAddExpense} className="space-y-3">
              <input
                type="text"
                placeholder="Title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                required
              />
              <input
                type="number"
                placeholder="Amount (T)"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                required
              />
              <input
                type="text"
                placeholder="Category (e.g. Food, Transport)"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"required
              />
              <input
                type="text"
                placeholder="Paid by (e.g. Melika)"
                value={formData.paidBy}
                onChange={(e) => setFormData({ ...formData, paidBy: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                required
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              />
              <button
                type="submit"
                className="w-full bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] py-2 rounded-lg font-bold transition"
              >
                + Add Expense
              </button>
            </form>
          </div>

          {/* لیست هزینه‌ها */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">📋 Expenses</h2>

            {/* هزینه‌ها به تفکیک افراد */}
            <div className="mb-6">
              <h3 className="text-white/70 text-sm font-semibold mb-2">👨‍👩‍👧‍👦 By Member</h3>
              <div className="flex flex-wrap gap-3">
                {Object.entries(byMember).map(([name, amount]) => (
                  <span key={name} className="bg-white/5 px-3 py-1 rounded-full text-white text-sm border border-white/10">
                    {name}: {amount.toLocaleString()} T
                  </span>
                ))}
                {Object.keys(byMember).length === 0 && (
                  <span className="text-white/40 text-sm">No expenses yet.</span>
                )}
              </div>
            </div>

            {/* لیست هزینه‌ها */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {expenses.length === 0 ? (
                <p className="text-white/50 text-center">No expenses yet.</p>
              ) : (
                expenses.map((expense) => (
                  <div
                    key={expense._id}
                    className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-white font-medium">{expense.title}</p>
                      <p className="text-white/50 text-xs">
                        {expense.category} • {expense.date} • {expense.paidBy}
                      </p>
                      {expense.description && (
                        <p className="text-white/40 text-xs">{expense.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold">{expense.amount.toLocaleString()} T</span>
                      <button
                        onClick={() => handleDelete(expense._id!)}
                        className="text-red-400 hover:text-red-300 transition text-sm px-2 py-1 rounded hover:bg-white/10"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
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