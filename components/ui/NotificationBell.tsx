"use client";

import { useState, useEffect } from "react";
import { getNotifications, markNotificationAsRead } from "@/lib/data";
import { Notification } from "@/lib/types";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") || "" : "";


     useEffect(() => {
       const loadNotifications = async () => {
    try {
      const data = await getNotifications(userId);
      setNotifications(data);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };
    if (userId) loadNotifications();
  }, [userId]);


  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAsRead = async (id: string) => {
    await markNotificationAsRead(id);
    const data = await getNotifications(userId);
    setNotifications(data)
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 rounded-full hover:bg-white/10 transition"
      >
        <span className="text-2xl">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-[#0D1E4C] border border-white/20 rounded-2xl shadow-xl backdrop-blur-md p-4 max-h-96 overflow-y-auto z-50">
          <h3 className="text-white font-bold mb-3">🔔 Notifications</h3>
          {notifications.length === 0 ? (
            <p className="text-white/50 text-sm">No notifications</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n._id}
                className={`p-3 rounded-xl mb-2 border ${n.isRead ? "border-white/10" : "border-[#C48CB3]/50"}`}
              >
                <p className="text-white font-medium text-sm">{n.title}</p>
                <p className="text-white/60 text-xs">{n.message}</p>
                <p className="text-white/40 text-xs mt-1">{new Date(n.date).toLocaleString()}</p>
                {!n.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(n._id!)}
                    className="mt-2 text-xs text-[#C48CB3] hover:underline"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}