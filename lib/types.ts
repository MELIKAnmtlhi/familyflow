export type ScheduleItem = {
    day: string;
    assignedTo: number[];
}

export type Task = {
    _id?: string;
    id: string;
    slug: string;
    title: string;
    schedule: ScheduleItem[];
    isCompleted: boolean;
    createdAt?: string;
};

export type Budget = {
    total: number;
    used: number;
};

export interface DataStorage {
    getTasks(): Task[];
    saveTasks(tasks: Task[]): void;
    getBudget(): Budget;
    saveBudget(budget: Budget): void;
    getTasksCompletionPercentage(): number;
    getBudgetUsedPercentage(): number;
};

export type GroceryItem = {
    id: number;
    name: string;
    isBought: boolean;
};

export type User = {
    id: number;
    email: string;
    password: string;
    name: string;
};

export type FamilyMember = {
    id?: string;
    _id: string;
   name: string;
   role: string;
   avatar: string;
   createdAt?: string;
   updateAt?: string;
};

export type CleaningItem = {
    id: number;
    name: string;
    isDone: boolean;
}

export type GroceryWeeklyItems = {
    Saturday: GroceryItem[];
    Sunday: GroceryItem[];
    Monday: GroceryItem[];
    Tuesday: GroceryItem[];
    Wednesday: GroceryItem[];
    Thursday: GroceryItem[];
    Friday: GroceryItem[];
}


export type CleaningWeeklyItems = {
    Saturday: CleaningItem[];
    Sunday:  CleaningItem[];
    Monday:  CleaningItem[];
    Tuesday:  CleaningItem[];
    Wednesday:  CleaningItem[];
    Thursday:  CleaningItem[];
    Friday:  CleaningItem[];
}

export type SchoolItem = {
    id: string;
    title: string;
    time: string;
    note: string;
    isDone: boolean
}

export type SchoolWeek = {
  Saturday: SchoolItem[];
  Sunday: SchoolItem[];
  Monday: SchoolItem[];
  Tuesday: SchoolItem[];
  Wednesday: SchoolItem[];
  Thursday: SchoolItem[];
  Friday: SchoolItem[];
};

export type HealthCheckup = {
    _id?: string;
    title: string;
    hospital: string;
    date: string;
    time: string;
    doctor?: string;
    notes?: string;
    isDone: boolean;
    createdAt?: string;
};

export type FamilyGathering = {
    _id?: string;
    title: string;
    dateTime: string;
    location: string;
    isDone: boolean;
    createdAt?: string;
};

export type Event = {
    _id?: string;
    title: string;
    date: string;
    type: "birthday" | "anniversary" | "event" | "other";
    description?: string;
    familyMemberId?: string;
    color: string;
}

export type Expense = {
    _id?: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    paidBy: string;
    description?: string;
    createdAt?: string;
};

export type BudgetSummary = {
    total: number;
    spent: number;
    remaining: number;
    byMember: Record<string, number>;
    byCategpry: Record<string, number>;
};

export type BudgetSettings = {
    _id?: string;
    total: number;
    updateAt?: string;
};

export type Notification = {
    _id?: string;
    title: string;
    message: string;
    date: string;
    isRead: boolean;
    userId: string;
    createdAt?: string;
};

