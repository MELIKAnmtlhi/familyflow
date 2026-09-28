"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getTasks } from "@/lib/data";
import { Task } from "@/lib/types";

import GroceryShopping from "@/components/tasks/GroceryShopping";
import HouseCleaning from "@/components/tasks/HouseCleaning";
import SchoolPickup from "@/components/tasks/SchoolPickup";
import HealthCheckups from "@/components/tasks/HealthCheckups";
import FamilyGathering from "@/components/tasks/FamilyGathering";
import DefaultTask from "@/components/tasks/DefaultTask";

export default function TaskDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTask = async () => {
      try {
        const tasks = await getTasks();
        const found = tasks.find((t) => t.slug === id || t._id === id || t.id === id);
        console.log("Found task:", found);
        
        if (!found) {
          router.push("/tasks");
          return;
        }
        setTask(found);
      } catch (error) {
        console.error("Error loading task:", error);
        router.push("/tasks");
      } finally {
        setLoading(false);
      }
    };
    loadTask();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#26415E] via-[#C48CB3] to-[#0D1E4C] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!task) return null

  switch (task.title) {
    case "Grocery shopping":
      return <GroceryShopping  />;
    case "House cleaning":
      return <HouseCleaning  />;
    case "School pickup":
      return <SchoolPickup  />;
    case "Health checkups":
      return <HealthCheckups />;
    case "Family gathering":
      return <FamilyGathering />;
    default:
      return <DefaultTask task={task}/>;
  }
}