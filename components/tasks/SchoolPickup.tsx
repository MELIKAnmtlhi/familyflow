"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSchoolPickup, updateSchoolPickup } from "@/lib/data";
import { SchoolWeek, SchoolItem } from "@/lib/types";
import WeekLayout from "../ui/WeekLayout";

const defaultWeek: SchoolWeek = {
  Saturday: [],
  Sunday: [],
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [],
  Friday: [],
};

export default function SchoolPickup() {
  const [week, setWeek] = useState<SchoolWeek>(defaultWeek);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<SchoolItem | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getSchoolPickup();
        if (data && Object.keys(data).length > 0) {
          setWeek(data);
        } else {
          const sample: SchoolWeek = {
            ...defaultWeek,
            Saturday: [
              {
                id: "1",
                title: "Math exam",
                time: "10:30",
                note: "Chapter 5 test",
                isDone: false,
              },
              {
                id: "2",
                title: "PE class",
                time: "13:00",
                note: "Bring sports clothes",
                isDone: false,
              },
            ],
          };
          setWeek(sample);
          await updateSchoolPickup(sample);
        }
      } catch (error) {
        console.error("Error loading school data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      updateSchoolPickup(week);
    }
  }, [week, loading]);

  const addItem = (day: keyof SchoolWeek) => {
    const newItem: SchoolItem = {
      id: Date.now().toString(),
      title: "",
      time: "",
      note: "",
      isDone: false,
    };
    setWeek((prev) => ({
      ...prev,
      [day]: [...prev[day], newItem],
    }));
    setEditingId(newItem.id);
    setEditData(newItem);
  };

  const deleteItem = (day: keyof SchoolWeek, id: string) => {
    setWeek((prev) => ({
      ...prev,
      [day]: prev[day].filter((item) => item.id !== id),
    }));
    if (editingId === id) {
      setEditingId(null);
      setEditData(null);
    }
  };

  const toggleDone = (day: keyof SchoolWeek, id: string) => {
    setWeek((prev) => ({
      ...prev,
      [day]: prev[day].map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      ),
    }));
  };

  const startEdit = (item: SchoolItem) => {
    setEditingId(item.id);
    setEditData({ ...item });
  };

  const saveEdit = (day: keyof SchoolWeek) => {
    if (!editData) return;
    setWeek((prev) => ({
      ...prev,
      [day]: prev[day].map((item) =>
        item.id === editData.id ? { ...editData } : item
      ),
    }));
    setEditingId(null);
    setEditData(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const renderDayCard = (day: string) => {
    const dayKey = day as keyof SchoolWeek
    const items = week[dayKey] || [];
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shadow-lg h-[340px] flex flex-col">
        <h3 className="text-white font-bold text-xm sm:text-lg border-b border-white/20 pb-2 mb-3 break-words">
          {day}
        </h3>

        <div className="max-h-64 overflow-y-auto space-y-3 pr-1 
          [&::-webkit-scrollbar]:w-1 
          [&::-webkit-scrollbar-track]:bg-white/10 
          [&::-webkit-scrollbar-thumb]:bg-white/30 
          [&::-webkit-scrollbar-thumb]:rounded-full"
        >
          {items.length === 0 ? (
            <p className="text-white/40 text-sm text-center py-4">No programs yet</p>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className={`bg-white/5 rounded-xl p-3 border ${
                  item.isDone ? "border-green-400/50" : "border-white/10"
                }`}
              >
                {editingId === item.id && editData ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) =>
                        setEditData({ ...editData, title: e.target.value })
                      }
                      placeholder="Program title..."
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                    />
                    <input
                      type="time"
                      value={editData.time}
                      onChange={(e) =>
                        setEditData({ ...editData, time: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                    />
                    <input
                      type="text"
                      value={editData.note}
                      onChange={(e) =>
                        setEditData({ ...editData, note: e.target.value })
                      }
                      placeholder="Note (optional)..."
                      className="w-full px-3 py-1.5 text-sm rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                    />
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => saveEdit(dayKey)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-lg text-sm font-semibold transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`text-white font-medium ${item.isDone ? "line-through text-white/50" : ""}`}>
                          {item.title || "Untitled"}
                        </h4>
                        {item.time && (
                          <p className="text-white/60 text-sm">🕐 {item.time}</p>
                        )}
                        {item.note && (
                          <p className="text-white/40 text-xs mt-1">{item.note}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 ml-2">
                        <button
                          onClick={() => toggleDone(dayKey, item.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                            item.isDone
                              ? "bg-green-500 border-green-500"
                              : "border-white/40 hover:border-white"
                          }`}
                        >
                          {item.isDone && (
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                        <button
                          onClick={() => startEdit(item)}
                          className="text-blue-400 hover:text-blue-300 transition text-sm px-2 py-1 rounded hover:bg-white/10"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteItem(dayKey, item.id)}
                          className="text-red-400 hover:text-red-300 transition text-sm px-2 py-1 rounded hover:bg-white/10"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        <button
          onClick={() => addItem(dayKey)}
          className="mt-3 w-full bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] py-2 rounded-xl font-bold transition text-sm"
        >
          + Add Program
        </button>
      </div>
    );
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
        <div className="max-w-6xl mx-auto">
            
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D1E4C]">Kids School Plan 🚸</h1>
          
        </div>

        <WeekLayout renderDay={renderDayCard}/>

        <div className="mt-8 flex justify-start">
        <Link href="/tasks" 
        className="bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-5 py-2 rounded-full text-sm font-semibold transition shadow-md">
          ← Back to Tasks
        </Link>
      </div>
      </div>
    </main>
  );
}