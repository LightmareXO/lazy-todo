export function sortTasks(tasks, sortMode) {
  return [...tasks].sort((a, b) => {
    if (sortMode === "created") return a.id.localeCompare(b.id);

    if (sortMode === "dueDate") {
      if (a.dueDate === b.dueDate) return a.dueTime.localeCompare(b.dueTime);
      return a.dueDate.localeCompare(b.dueDate);
    }

    return 0;
  });
}

export function getIncompleteTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}

export function getCompletedTasks(tasks) {
  return tasks.filter((task) => task.completed);
}

export function getNextIncompleteTask(tasks) {
  return getIncompleteTaskAt(tasks, 0);
}

export function getIncompleteTaskAt(tasks, index) {
  return getIncompleteTasks(tasks)[index];
}
