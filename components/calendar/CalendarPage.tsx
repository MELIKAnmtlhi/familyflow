"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { getEvents, addEvent, deleteEvent } from "@/lib/data";
import { Event } from "@/lib/types";
import Link from "next/link";

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    type: "event" as Event["type"],
    description: "",
    color: "#C48CB3",
  });

  useEffect(() => {
      const loadEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };
    loadEvents();
  }, []);

  // const loadEvents = async () => {
  //   try {
  //     const data = await getEvents();
  //     setEvents(data);
  //   } catch (error) {
  //     console.error("Error loading events:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return;
    try {
      await addEvent(formData);
      setFormData({ title: "", date: "", type: "event", description: "", color: "#C48CB3" });
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteEvent(id);
      const data = await getEvents();
      setEvents(data);
    }
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const dateStr = date.toISOString().split("T")[0];
      const dayEvents = events.filter((e) => e.date === dateStr);
      if (dayEvents.length > 0) {
        return (
          <div className="flex justify-center gap-1 mt-1">
            {dayEvents.map((e, i) => (
              <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: e.color }}></span>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  const selectedDateStr = selectedDate.toISOString().split("T")[0];
  const filteredEvents = events.filter((e) => e.date === selectedDateStr);

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
           <h1 className="text-2xl md:text-3xl font-bold text-[#0D1E4C]">Family Calendar 📅</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* سمت چپ: تقویم */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <Calendar
              onChange={(value) => {
                if (value instanceof Date){
                  setSelectedDate(value)
                }
              }} 
              value={selectedDate}
              tileContent={tileContent}
              className="w-full border-none bg-transparent text-white"
            />
          </div>

          {/* سمت راست: لیست رویدادها + فرم افزودن */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-4">
              📋 {selectedDate.toLocaleDateString("fa-IR")}
            </h2>

            {/* فرم افزودن رویداد */}
            <form onSubmit={handleAddEvent} className="space-y-3 mb-6">
              <input
                type="text"
                placeholder="Event title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                required
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
                required
              />
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Event["type"] })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              >
                <option value="birthday">🎂 Birthday</option>
                <option value="anniversary">💍 Anniversary</option>
                <option value="event">🎉 Event</option>
                {/* <option value="school">📚 School</option> */}
                <option value="other">📌 Other</option>
              </select>
              <input
                type="text"
                placeholder="Description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              />
              <input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full h-10 rounded-lg bg-white/20 border border-white/30 cursor-pointer"
              />
              <button
                type="submit"
                className="w-full bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] py-2 rounded-lg font-bold transition"
              >
                + Add Event
              </button>
            </form>

            {/* لیست رویدادهای روز انتخاب شده */}
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredEvents.length === 0 ? (
                <p className="text-white/50 text-sm">No events for this day.</p>
              ) : (
                filteredEvents.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white/5 rounded-xl p-3 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: event.color }}></span>
                      <div>
                        <p className="text-white font-medium">{event.title}</p>
                        <p className="text-white/50 text-xs">{event.type}</p>
                        {event.description && <p className="text-white/40 text-xs">{event.description}</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event._id!)}
                      className="text-red-400 hover:text-red-300 transition text-sm px-2 py-1 rounded hover:bg-white/10"
                    >
                      🗑️
                    </button>
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