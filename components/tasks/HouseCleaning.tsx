"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getHouseCleaningTasks, updateHouseCleaningTasks, getWeeklyReset, updateWeeklyReset } from "@/lib/data";
import { CleaningWeeklyItems, CleaningItem } from "@/lib/types";
import WeekLayout from "../ui/WeekLayout";

const defaultItems: CleaningWeeklyItems = {
  Saturday: [
    { id: 1, name: "Dusting", isDone: false },
    { id: 2, name: "Vacuuming", isDone: false },
    { id: 3, name: "Mopping", isDone: false },
  ],
  Sunday: [{ id: 1, name: "Dishwashing", isDone: false }],
  Monday: [{ id: 1, name: "Laundry", isDone: false }],
  Tuesday: [{ id: 1, name: "Clean windows", isDone: false }],
  Wednesday: [{ id: 1, name: "Take out trash", isDone: false }],
  Thursday: [{ id: 1, name: "Organize closets", isDone: false }],
  Friday: [{ id: 1, name: "Water plants", isDone: false }],
};

const getCurrentWeek = () => {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNumber}`;
};

export default function HouseCleaning() {
  
  const [items, setItems] = useState<CleaningWeeklyItems>(defaultItems);
  const [newItemName, setNewItemName] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      const currentWeek = getCurrentWeek();
      const resetData = await getWeeklyReset();

      if (resetData.lastResetWeek !== currentWeek) {
        await updateHouseCleaningTasks(defaultItems);
        await updateWeeklyReset(currentWeek);
        setItems(defaultItems);
      } else {
        const data = await getHouseCleaningTasks();
        if (data && Object.keys(data).length > 0) {
          setItems(data);
        } else {
          setItems(defaultItems);
        }
      }
      setLoading(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    if (!loading) {
      updateHouseCleaningTasks(items);
    }
  }, [items, loading]);

  const toggleItem = (day: string, itemId: number) => {
    setItems((prev) => {
      const dayKey = day as keyof CleaningWeeklyItems;
      const updated =  prev[dayKey].map((item) =>
        item.id === itemId ? { ...item, isDone: !item.isDone } : item
      );
      return { ...prev, [dayKey]: updated}
    });
  };

  const deleteItem = (day: string, itemId: number) => {
     setItems((prev) => { 
      const dayKey = day as keyof CleaningWeeklyItems;
      const filtered = prev[dayKey].filter((item) => item.id !== itemId);
      return { ...prev, [dayKey]: filtered}
     });
  };

  const addItem = (day: string) => {
    const name = newItemName[day]?.trim();
    if (!name) return;
    const newId = Date.now();
    setItems((prev) => {
      const dayKey = day as keyof CleaningWeeklyItems;
      return {
      ...prev,
      [day]: [...prev[dayKey], { id: newId, name, isDone: false }],
      };
    });
    setNewItemName((prev) => ({ ...prev, [day]: "" }));
  };

  const renderDayCard = (day: string, dayItems: CleaningItem[]) => (
    <div className="bg-white/5 rounded-lg p-3 flex flex-col h-[340px]">
     
      <h3 className="text-white font-bold text-xm sm:text-lg border-b border-white/20 pb-2 mb-3 break-words">
          {day}
        </h3>
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full">
        {dayItems.length === 0 ? (
          <p className="text-white/40 text-sm text-center">No tasks</p>
        ) : (
          dayItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={item.isDone}
                onChange={() => toggleItem(day, item.id)}
                className="w-4 h-4 accent-[#C48CB3]"
              />
              <span className={`text-white/80 text-sm ${item.isDone ? "line-through text-white/40" : ""}`}>
                {item.name}
              </span>
            </label>
            <button onClick={() => deleteItem(day, item.id)}
               className="text-red-400 hover:text-red-300 transition text-xs px-2 py-1 rounded hover:bg-white/10"
              >
                 ✕ Delete
            </button>
            </div>
          ))
        )}
        </div>
      <div className="flex gap-1 sm:gap-2 mt-1 w-full">
        <input
          type="text"
          value={newItemName[day] || ""}
          onChange={(e) => setNewItemName((prev) => ({ ...prev, [day]: e.target.value }))}
          onKeyDown={(e) => e.key === "Enter" && addItem(day)}
          placeholder="Add item..."
          className="flex-1 min-w-0 px-1.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded bg-white/20 text-white placeholder-white/40 border border-white/20 focus:outline-none focus:ring-1 focus:ring-[#C48CB3]"
        />
        <button
          onClick={() => addItem(day)}
          className="flex-shrink-0 w-7 h-7 sm:w-9 sm:h-9 bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] rounded text-sm sm:text-base font-bold transition flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D1E4C]">House Cleaning 🧹 </h1>
         
        </div>

      <WeekLayout renderDay={(day) => renderDayCard(day, items[day as keyof CleaningWeeklyItems])}/>
       
          <div className="mt-8 flex justify-start">
          <Link
            href="/tasks"
            className="bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-5 py-2 rounded-full text-sm font-semibold transition shadow-md"
          >
            ← Back to Tasks
          </Link>
        </div>
      </div>
    </main>
  );
}