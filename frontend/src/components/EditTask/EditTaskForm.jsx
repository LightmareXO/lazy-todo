import { useState } from "react";
import {
  getTodayDateString,
  toTimeString,
  validateTaskInput,
} from "../../lib/taskValidation";

function EditTaskForm({ task, editTask, closeModal, isCompleted }) {
  const [taskName, setTaskName] = useState(task.name);
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate);
  const [taskDueTime, setTaskDueTime] = useState(task.dueTime);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = validateTaskInput({
      name: taskName,
      dueDate: taskDueDate,
      dueTime: taskDueTime,
    });

    if (!result.isValid) {
      setErrorMessage(result.errorMessage);
      return;
    }

    editTask(
      task.id,
      result.task.name,
      result.task.dueDate,
      result.task.dueTime,
    );
    closeModal();
  };

  const todayDate = getTodayDateString();
  const currentTime = toTimeString(new Date());

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="task-name"
            className="mt-2 w-full rounded-md border border-border-default bg-surface-input px-3 py-2 text-primary outline-none focus:border-gray-700 dark:focus:border-gray-400"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
          />
        </div>

        {!isCompleted && (
          <div>
            <input
              className="mt-2 w-40 rounded-md border border-border-default bg-surface-input px-3 py-2 text-primary outline-none focus:border-gray-700 dark:focus:border-gray-400"
              type="date"
              min={todayDate}
              value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              required
            />
            <input
              className="mt-2 ml-2 w-40 rounded-md border border-border-default bg-surface-input px-3 py-2 text-primary outline-none focus:border-gray-700 dark:focus:border-gray-400"
              type="time"
              value={taskDueTime}
              min={taskDueDate === todayDate ? currentTime : "00:00"}
              onChange={(e) => setTaskDueTime(e.target.value)}
              required
            />
          </div>
        )}

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
              className="rounded-md border border-border-default px-4 py-2 hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
              className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:active:bg-white"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default EditTaskForm;
