export const EMPTY_TASK_ERROR = "Please fill in all fields";
export const PAST_TASK_ERROR = "Please select a future date and time";

export function toDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function toTimeString(date) {
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  return `${hour}:${minute}`;
}

export function getTodayDateString(now = new Date()) {
  return toDateString(now);
}

export function getTomorrowDateString(now = new Date()) {
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  return toDateString(tomorrow);
}

export function validateTaskInput(
  { name, dueDate, dueTime },
  now = new Date(),
) {
  const task = {
    name: name.trim(),
    dueDate: dueDate.trim(),
    dueTime: dueTime.trim(),
  };

  if (task.name === "" || task.dueDate === "" || task.dueTime === "") {
    return { isValid: false, errorMessage: EMPTY_TASK_ERROR, task };
  }

  const today = getTodayDateString(now);
  const currentTime = toTimeString(now);

  if (
    task.dueDate < today ||
    (task.dueDate === today && task.dueTime < currentTime)
  ) {
    return { isValid: false, errorMessage: PAST_TASK_ERROR, task };
  }

  return { isValid: true, errorMessage: "", task };
}
