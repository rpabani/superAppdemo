import { useState, useEffect } from 'react';
import initialData from '../../data/planning.json';

const STORAGE_KEY = 'superapp_tasks';

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setTasks(JSON.parse(stored));
    } else {
      setTasks(initialData.tasks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData.tasks));
    }
  }, []);

  const saveToStorage = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const getNextId = () => {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map((t) => t.id)) + 1;
  };

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: getNextId(),
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveToStorage(updated);
  };

  const updateTask = (id, updates) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTasks(updated);
    saveToStorage(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveToStorage(updated);
  };

  const moveTask = (id, newStatus) => {
    updateTask(id, { status: newStatus });
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((t) => t.status === status);
  };

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
  };
}
