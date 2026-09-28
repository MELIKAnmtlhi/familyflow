"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getNotifications, addNotification, markNotificationAsRead, deleteNotification } from "@/lib/data";
import { Notification } from "@/lib/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    date: "",
  });
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";

   useEffect(() => {
    const loadNotifications = async () => {
    try {
      const data = await getNotifications(userId);
      setNotifications(data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  }
    loadNotifications();
  }, [userId]);


  const handleAddNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message || !formData.date) return;

    try {
      await addNotification({
        title: formData.title,
        message: formData.message,
        date: new Date(formData.date).toISOString(),
        isRead: false,
        userId: userId,
      });
      setFormData({ title: "", message: "", date: "" });
      const data = await getNotifications(userId)
      setNotifications(data);
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
     const data = await getNotifications(userId)
      setNotifications(data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteNotification(id);
       const data = await getNotifications(userId)
      setNotifications(data);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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
        {/* هدر */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#0D1E4C]">Notifications 🔔</h1>
            {unreadCount > 0 && (
              <p className="text-[#C48CB3] text-sm mt-1">
                {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
              </p>
            )}
          </div>
        </div>

        {/* فرم افزودن نوتیف */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl mb-8">
          <h2 className="text-xl font-bold text-white mb-4">➕ New Notification</h2>
          <form onSubmit={handleAddNotification} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Title..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
            <input
              type="text"
              placeholder="Message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
            <input
              type="datetime-local"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
              required
            />
            <button
              type="submit"
              className="md:col-span-3 bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] py-2 rounded-lg font-bold transition"
            >
              + Add Notification
            </button>
          </form>
        </div>

        {/* لیست نوتیفیکیشن‌ها */}
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 text-center border border-white/20">
              <p className="text-white/60 text-lg">No notifications yet 🎉</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-5 border transition-all ${
                  n.isRead ? "border-white/10" : "border-[#C48CB3]/50 shadow-lg shadow-[#C48CB3]/5"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold text-white ${n.isRead ? "opacity-70" : ""}`}>
                      {n.title}
                    </h3>
                    <p className={`text-sm ${n.isRead ? "text-white/50" : "text-white/70"} mt-1`}>
                      {n.message}
                    </p>
                    <p className="text-white/30 text-xs mt-2">
                      📅 {new Date(n.date).toLocaleString("fa-IR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {!n.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(n._id!)}
                        className="bg-[#C48CB3]/20 hover:bg-[#C48CB3]/30 text-[#C48CB3] px-3 py-1.5 rounded-full text-xs font-semibold transition"
                      >
                        Mark as read
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(n._id!)}
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