"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getFamilyGatherings, addFamilyGathering, updateFamilyGathering, deleteFamilyGathering } from "@/lib/data";
import { FamilyGathering} from "@/lib/types";

export default function FamilyGatherings() {
  
  const [items, setItems] = useState<FamilyGathering[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<FamilyGathering, "_id" | "createdAt">>({
    title: "",
    dateTime: "",
    location: "",
    isDone: false,
  });

  useEffect(() => {
     const loadData = async () => {
    try {
      const data = await getFamilyGatherings();
      setItems(data);
    } catch (error) {
      console.error("Error loading:", error);
    } finally {
      setLoading(false);
    }
  };
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await getFamilyGatherings();
      setItems(data);
    } catch (error) {
      console.error("Error loading:", error);
    } finally {
      setLoading(false);
      
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.dateTime || !formData.location) return;

    try {
      if (editingId) {
        await updateFamilyGathering(editingId, formData);
        setEditingId(null);
      } else {
        await addFamilyGathering(formData);
      }
      setFormData({ title: "", dateTime: "", location: "", isDone: false });
      loadData();
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleEdit = (item: FamilyGathering) => {
    setEditingId(item._id!);
    setFormData({
      title: item.title,
      dateTime: item.dateTime,
      location: item.location,
      isDone: item.isDone,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteFamilyGathering(id);
      loadData();
    }
  };

  const toggleDone = async (item: FamilyGathering) => {
    await updateFamilyGathering(item._id!, { isDone: !item.isDone });
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
        {/* ID: {task._id || task.id} */}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-6">
     

         <div className="max-w-6xl mx-auto">
        
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D1E4C]">Family Gathering🎊</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              placeholder="Event title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
            <input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
            <input
              type="text"
              placeholder="Location..."
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-6 py-2 rounded-lg font-bold transition"
          >
            {editingId ? "Update" : "+ Add Gathering"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", dateTime: "", location: "", isDone: false });
              }}
              className="mt-4 ml-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-bold transition"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-white/50 text-center">No gatherings yet.</p>
          ) : (
            items.map((item) => (
              <div
                key={item._id}
                className={`bg-white/10 backdrop-blur-md rounded-xl p-5 border ${
                  item.isDone ? "border-green-400/50" : "border-white/20"
                }`}
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className={`text-xl font-bold text-white ${item.isDone ? "line-through text-white/50" : ""}`}>
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm">📅 {new Date(item.dateTime).toLocaleString()}</p>
                    <p className="text-white/60 text-sm">📍 {item.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleDone(item)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${
                        item.isDone ? "bg-green-500 border-green-500" : "border-white/40 hover:border-white"
                      }`}
                    >
                      {item.isDone && (
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-400 hover:text-blue-300 transition text-sm px-2 py-1 rounded hover:bg-white/10"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(item._id!)}
                      className="text-red-400 hover:text-red-300 transition text-sm px-2 py-1 rounded hover:bg-white/10"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
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

