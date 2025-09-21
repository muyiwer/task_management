import { useState, useEffect } from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "High" | "Medium" | "Low";
  completed: boolean;
  dueDate: string; // ISO string for persistence
  createdAt: string; // ISO string
}

export const useTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [query, setQuery] = useState("");

  // Load tasks from localStorage (only once on mount)
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      setTasks(JSON.parse(stored));
    }
  }, []);

  // Persist to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (task: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  // Toggle completion
  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Delete Task
  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // Edit Task
  const editTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Return tasks and handlers
  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setTasks,
    filteredTasks,
    query, setQuery
  };
};
