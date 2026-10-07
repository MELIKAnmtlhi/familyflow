"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getHealthCheckups, addHealthCheckup, updateHealthCheckup, deleteHealthCheckup } from "@/lib/data";
import { HealthCheckup } from "@/lib/types";

export default function HealthCheckups() {
  const [items, setItems] = useState<HealthCheckup[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<HealthCheckup, "_id" | "createdAt">>({
    title: "",
    hospital: "",
    date: "",
    time: "",
    doctor: "",
    notes: "",
    isDone: false,
  });

  useEffect(() => {
     const loadData = async () => {
    try {
      const data = await getHealthCheckups();
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
      const data = await getHealthCheckups();
      setItems(data);
    } catch (error) {
      console.error("Error loading:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.hospital || !formData.date || !formData.time) return;

    try {
      if (editingId) {
        await updateHealthCheckup(editingId, formData);
        setEditingId(null);
      } else {
        await addHealthCheckup(formData);
      }
      setFormData({ title: "", hospital: "", date: "", time: "", doctor: "", notes: "", isDone: false });
      loadData();
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleEdit = (item: HealthCheckup) => {
    setEditingId(item._id!);
    setFormData({
      title: item.title,
      hospital: item.hospital,
      date: item.date,
      time: item.time,
      doctor: item.doctor || "",
      notes: item.notes || "",
      isDone: item.isDone,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteHealthCheckup(id);
      loadData();
    }
  };

  const toggleDone = async (item: HealthCheckup) => {
    await updateHealthCheckup(item._id!, { isDone: !item.isDone });
    loadData();
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
          <h1 className="text-2xl md:text-3xl font-bold text-[#0D1E4C]">Health Checkups 🩺</h1>
         
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title (e.g. Annual Checkup)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
            <input
              type="text"
              placeholder="Hospital / Clinic"
              value={formData.hospital}
              onChange={(e) => setFormData({ ...formData, hospital: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"required
            />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
            <input
              type="text"
              placeholder="Doctor (optional)"
              value={formData.doctor}
              onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
            />
            <input
              type="text"
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-6 py-2 rounded-lg font-bold transition"
          >
            {editingId ? "Update" : "+ Add Checkup"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({ title: "", hospital: "", date: "", time: "", doctor: "", notes: "", isDone: false });
              }}
              className="mt-4 ml-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-bold transition"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="space-y-4">
          {items.length === 0 ? (
            <p className="text-white/50 text-center">No health checkups yet.</p>
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
                    <p className="text-white/70 text-sm">🏥 {item.hospital}</p>
                    <p className="text-white/60 text-sm">
                      📅 {item.date} 🕐 {item.time}
                    </p>
                    {item.doctor && <p className="text-white/50 text-sm">👨‍⚕️ {item.doctor}</p>}
                    {item.notes && <p className="text-white/40 text-sm mt-1">📝 {item.notes}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleDone(item)}
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition ${
                        item.isDone ? "bg-green-500 border-green-500" : "border-white/40 hover:border-white"}`}
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