"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Task } from "@/lib/types";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };
    loadTasks();
  }, []);

  const handleAddTask = async () => {
    console.log("add button clicked!")
    if (!newTaskTitle.trim()) return;
    try {
      console.log("Sending task:", newTaskTitle)
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTaskTitle,
          isCompleted: false,
          createdAt: new Date().toISOString(),
        }),
      });
      console.log("Response status:", res.status)
      if (!res.ok) throw new Error("Failed to add task");
      setNewTaskTitle("");
      await loadTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update task");
      loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete task");
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">📋 Tasks</h1>

        <div className="mb-8 flex gap-2">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
            placeholder="Write a new task..."
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#C48CB3]"
          />
          <button
            onClick={handleAddTask}
            className="bg-[#C48CB3] hover:bg-[#83A6CE] text-[#0D1E4C] px-6 py-2 rounded-lg font-bold transition"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <p className="text-center text-white/70">No tasks yet. Add one!</p>
          ) : (
            tasks.map((task) => (
              <div
                key={task._id}
                className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => handleToggle(task.id, task.isCompleted)}
                    className="w-5 h-5 accent-[#C48CB3] cursor-pointer"
                  />
                  <Link
                    href={`/tasks/${task.slug || task._id}`}
                    className={`text-white hover:text-[#C48CB3] transition ${
                      task.isCompleted ? "line-through text-white/50" : ""
                    }`}
                  >
                    {task.title}
                  </Link>
                </div>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-400 hover:text-red-300 transition text-sm px-2 py-1 rounded hover:bg-white/10"
                >
                  ✕ Delete
                </button>
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