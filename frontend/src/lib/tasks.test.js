import { describe, expect, it } from "vitest";
import {
  getCompletedTasks,
  getIncompleteTaskAt,
  getIncompleteTasks,
  getNextIncompleteTask,
  sortTasks,
} from "./tasks";

const tasks = [
  {
    id: "task-c",
    name: "third",
    dueDate: "2026-06-06",
    dueTime: "09:00",
    completed: false,
  },
  {
    id: "task-a",
    name: "first",
    dueDate: "2026-06-05",
    dueTime: "15:00",
    completed: true,
  },
  {
    id: "task-b",
    name: "second",
    dueDate: "2026-06-05",
    dueTime: "10:00",
    completed: false,
  },
];

describe("sortTasks", () => {
  it("sorts by id when sort mode is created", () => {
    expect(sortTasks(tasks, "created").map((task) => task.id)).toEqual([
      "task-a",
      "task-b",
      "task-c",
    ]);
  });

  it("sorts by due date and then due time", () => {
    expect(sortTasks(tasks, "dueDate").map((task) => task.id)).toEqual([
      "task-b",
      "task-a",
      "task-c",
    ]);
  });

  it("does not mutate the original tasks", () => {
    const originalOrder = tasks.map((task) => task.id);

    sortTasks(tasks, "created");

    expect(tasks.map((task) => task.id)).toEqual(originalOrder);
  });
});

describe("task filters", () => {
  it("returns incomplete tasks", () => {
    expect(getIncompleteTasks(tasks).map((task) => task.id)).toEqual([
      "task-c",
      "task-b",
    ]);
  });

  it("returns completed tasks", () => {
    expect(getCompletedTasks(tasks).map((task) => task.id)).toEqual(["task-a"]);
  });

  it("returns the first incomplete task", () => {
    expect(getNextIncompleteTask(tasks)).toEqual(tasks[0]);
  });

  it("returns undefined when there is no next incomplete task", () => {
    const completedTasks = tasks.map((task) => ({ ...task, completed: true }));

    expect(getNextIncompleteTask(completedTasks)).toBeUndefined();
  });

  it("returns the second incomplete task", () => {
    expect(getIncompleteTaskAt(tasks, 1)).toEqual(tasks[2]);
  });

  it("returns undefined when there is no second incomplete task", () => {
    const oneIncompleteTask = [
      { ...tasks[0], completed: false },
      { ...tasks[1], completed: true },
      { ...tasks[2], completed: true },
    ];

    expect(getIncompleteTaskAt(oneIncompleteTask, 1)).toBeUndefined();
  });
});
