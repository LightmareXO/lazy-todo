import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import { useEffect, useState } from "react";
import { uuidv7 } from "uuidv7";
import { sortTasks } from "../lib/tasks";

function MainLayout() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (savedTasks) {
      return JSON.parse(localStorage.getItem("tasks"));
    }

    return [
      {
        id: uuidv7(),
        name: "example task",
        dueDate: "2030-01-01",
        dueTime: "12:00",
        completed: false,
      },
      // { id: uuidv7(), name: 'test task2', dueDate: '2026-06-01', dueTime: '10:00', completed: false },
      // { id: uuidv7(), name: 'test task3', dueDate: '2026-05-29', dueTime: '12:00', completed: false },
    ];
  });

  const [settings, setSettings] = useState(() => {
    const savedSettings = JSON.parse(localStorage.getItem("settings"));

    if (savedSettings) {
      return { sortMode: "dueDate", theme: "light", ...savedSettings };
    }

    return { sortMode: "dueDate", theme: "light" };
  });

  const sortMode = settings.sortMode;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applyTheme = () => {
      const isDark =
        settings.theme === "dark" ||
        (settings.theme === "system" && mediaQuery.matches);

      document.documentElement.classList.toggle("dark", isDark);
    };

    applyTheme();
    mediaQuery.addEventListener("change", applyTheme);

    return () => mediaQuery.removeEventListener("change", applyTheme);
  }, [settings.theme]);

  const addTask = (taskName, taskDueDate, taskDueTime) => {
    if (taskName.trim() === "") return;
    setTasks([
      ...tasks,
      {
        id: uuidv7(),
        name: taskName,
        dueDate: taskDueDate,
        dueTime: taskDueTime,
        completed: false,
      },
    ]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const toggleSortMode = () => {
    setSettings((prev) => {
      return {
        ...prev,
        sortMode: prev.sortMode === "created" ? "dueDate" : "created",
      };
    });
  };

  const setTheme = (theme) => {
    setSettings((prev) => ({ ...prev, theme }));
  };

  const isDark =
    settings.theme === "dark" ||
    (settings.theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const sortedTasks = sortTasks(tasks, sortMode);

  const editTask = (id, taskName, taskDueDate, taskDueTime) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              name: taskName,
              dueDate: taskDueDate,
              dueTime: taskDueTime,
            }
          : task,
      ),
    );
  };

  return (
    <div className="flex min-h-screen bg-page text-primary">
      <Sidebar />
      <main className="relative flex-1 p-4">
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        <Outlet
          context={{
            tasks,
            addTask,
            deleteTask,
            deleteCompletedTasks,
            editTask,
            toggleTask,
            sortedTasks,
            sortMode,
            toggleSortMode,
            theme: settings.theme,
            setTheme,
          }}
        />
      </main>
    </div>
  );
}

export default MainLayout;
