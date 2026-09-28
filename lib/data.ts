import { Task, Budget, User, FamilyMember, SchoolWeek } from './types';
import { GroceryWeeklyItems, CleaningWeeklyItems } from './types';
import { HealthCheckup } from "./types";
import { FamilyGathering } from './types';
import { Event } from "./types";
import { Expense } from "./types";
import { BudgetSettings } from "./types";
import { Notification } from "./types";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const res = await fetch(`/api/tasks`);
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.log("Failed to fetch tasks:", error);
    return [];
  }
};

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  console.log('saveTasks called', tasks);
};

export const getBudget = async (): Promise<Budget> => {
  const res = await fetch(`/api/budget`);
  return res.json();
};

export const saveBudget = async (budget: Budget): Promise<void> => {
  await fetch(`/api/budget`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(budget),
  });
};

export const getTasksCompletionPercentage = async (): Promise<number> => {
  const tasks = await getTasks();
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(t => t.isCompleted).length;
  return Math.round((completed / tasks.length) * 100);
};

export const getBudgetUsedPercentage = async (): Promise<number> => {
  const budget = await getBudget();
  if (budget.total === 0) return 0;
  return Math.round((budget.used / budget.total) * 100);
};

export const addTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const res = await fetch(`/api/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  return res.json();
};

export const updateTaskStatus = async (id: number, isCompleted: boolean): Promise<Task> => {
  const res = await fetch(`/api/tasks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isCompleted }),
  });
  return res.json();
};

export const deleteTask = async (id: number): Promise<void> => {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
};

export const getWeeklyItems = async (): Promise<GroceryWeeklyItems> => {
  const res = await fetch(`/api/weeklyItems`);
  return res.json();
};

export const updateWeeklyItems = async (items: GroceryWeeklyItems): Promise<void> => {
  await fetch(`/api/weeklyItems`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(items),
  });
};

export const getWeeklyReset = async () => {
  const res = await fetch(`/api/weeklyReset`);
  return res.json();
};

export const updateWeeklyReset = async (lastResetWeek: string) => {
  await fetch(`/api/weeklyReset`, {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ lastResetWeek }),
  });
};

export const getUsers = async (): Promise<User[]> => {
  const res = await fetch(`/api/users`);
  return res.json();
};

export const addUser = async (user: Omit<User, "id">): Promise<User> => {
  const res = await fetch(`/api/users`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  return res.json();
};

export const getFamilyMembers = async (): Promise<FamilyMember[]> => {
  const res = await fetch(`/api/familyMembers`);
  return res.json();
};

export const addFamilyMember = async (member: Omit<FamilyMember, "_id" | 'id'>): Promise<FamilyMember> => {
  const res = await fetch(`/api/familyMembers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(member),
  });
  return res.json();
};

export const deleteFamilyMember = async (id: number): Promise<void> => {
  await fetch(`/api/familyMembers/${id}`, {
    method: 'DELETE',
  });
};

export const getHouseCleaningTasks = async (): Promise<CleaningWeeklyItems> => {
  const res = await fetch(`/api/houseCleaningTasks`);
  return res.json();
};

export const updateHouseCleaningTasks = async (tasks: CleaningWeeklyItems): Promise<void> => {
  await fetch(`/api/houseCleaningTasks`, {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tasks),
  });
};

export const getGroceryItems = async (): Promise<GroceryWeeklyItems> => {
  const res = await fetch("/api/groceryShopping");
  return res.json();
};

export const updateGroceryItems = async (tasks: GroceryWeeklyItems): Promise<void> => {
  await fetch("/api/groceryShopping", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tasks),
  });
};

export const getSchoolPickup = async (): Promise<SchoolWeek> => {
  const res = await fetch("/api/schoolPickup");
  if (!res.ok) {
    throw new Error("Failed to fetch school pickup data");
  }
  return res.json();
};

export const updateSchoolPickup = async (data: SchoolWeek): Promise<void> => {
  const res = await fetch("/api/schoolPickup", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to update school pickup data");
  }
};

export const getHealthCheckups = async (): Promise<HealthCheckup[]> => {
  const res = await fetch("/api/healthCheckups");
  if (!res.ok) throw new Error("Failed to fetch health checkups");
  return res.json();
};

export const addHealthCheckup = async (data: Omit<HealthCheckup, "_id" | "createdAt">): Promise<HealthCheckup> => {
  const res = await fetch("/api/healthCheckups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add health checkup");
  return res.json();
};

export const updateHealthCheckup = async (id: string, data: Partial<Omit<HealthCheckup, "_id" | "createdAt">>): Promise<HealthCheckup> => {
  const res = await fetch(`/api/healthCheckups/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update health checkup");
  return res.json();
};

export const deleteHealthCheckup = async (id: string): Promise<void> => {
  const res = await fetch(`/api/healthCheckups/${id}, {
    method: "DELETE",
  }`);
  if (!res.ok) throw new Error("Failed to delete health checkup");
};


export const getFamilyGatherings = async (): Promise<FamilyGathering[]> => {
  const res = await fetch("/api/familyGathering");
  if (!res.ok) throw new Error("Failed to fetch family gatherings");
  return res.json();
};

export const addFamilyGathering = async (data: Omit<FamilyGathering, "_id" | "createdAt">): Promise<FamilyGathering> => {
  const res = await fetch("/api/familyGathering", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add family gathering");
  return res.json();
};

export const updateFamilyGathering = async (
  id: string,
  data: Partial<Omit<FamilyGathering, "_id" | "createdAt">>
): Promise<FamilyGathering> => {
  const res = await fetch(`/api/familyGathering/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update family gathering");
  return res.json();
};

export const deleteFamilyGathering = async (id: string): Promise<void> => {
  const res = await fetch(`/api/familyGathering/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete family gathering");
};

export const getEvents = async (): Promise<[Event]> => {
  const res = await fetch("/api/events");
  if(!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export const addEvent = async (data: Omit<Event, "_id">): Promise<Event> => {
   const res = await fetch("/api/events", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data),
   });
   if(!res.ok) throw new Error("Failed to add event");
   return res.json();
}

export const deleteEvent = async (id: string): Promise<void> => {
  const res = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  })
  if(!res.ok) throw new Error("Failed to delete event")
}


export const getExpenses = async (): Promise<Expense[]> => {
  const res = await fetch("/api/expenses");
  if (!res.ok) throw new Error("Failed to fetch expenses");
  return res.json();
};

export const addExpense = async (data: Omit<Expense, "_id" | "createdAt">): Promise<Expense> => {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add expense");
  return res.json();
};

export const deleteExpense = async (id: string): Promise<void> => {
  const res = await fetch(`/api/expenses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete expense");
};


export const getBudgetSettings = async (userId: string): Promise<BudgetSettings> => {
  const res = await fetch(`/api/budgetSettings?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch budget settings");
  return res.json();
};

export const updateBudgetSettings = async (userId: string,  total: number ): Promise<BudgetSettings> => {
  const res = await fetch("/api/budgetSettings", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, total}),
  });
  if (!res.ok) throw new Error("Failed to update budget settings");
  return res.json();
};

export const getNotifications = async (userId: string): Promise<Notification[]> => {
  const res = await fetch(`/api/notifications?userId=${userId}`);
  if (!res.ok) throw new Error("Failed to fetch notifications");
  return res.json();
};

export const addNotification = async (data: Omit<Notification, "_id" | "createdAt">): Promise<Notification> => {
  const res = await fetch("/api/notifications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add notification");
  return res.json();
};

export const markNotificationAsRead = async (id: string): Promise<void> => {
  const res = await fetch(`/api/notifications/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isRead: true }),
  });
  if (!res.ok) throw new Error("Failed to mark notification as read");
};

export const deleteNotification = async (id: string): Promise<void> => {
  const res = await fetch(`/api/notifications/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete notification");
};