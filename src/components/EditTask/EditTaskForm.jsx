import { useState } from "react";

function EditTaskForm({ task, editTask, closeModal, isCompleted }) {
  const getTodayString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate());

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const date = String(tomorrow.getDate()).padStart(2, "0");

    return `${year}-${month}-${date}`;
  };

  const getNowString = () => {
    const now = new Date();
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    return `${hour}:${minute}`;
  };

  const [taskName, setTaskName] = useState(task.name);
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate);
  const [taskDueTime, setTaskDueTime] = useState(task.dueTime);
  const [errorMassage, setErrorMassage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedTaskName = taskName.trim();
    const trimmedTaskDue = taskDueDate.trim();
    const trimmedTaskTime = taskDueTime.trim();
    if (
      trimmedTaskName === "" ||
      trimmedTaskDue === "" ||
      trimmedTaskTime === ""
    ) {
      setErrorMassage("Please fill in all fields");
      return;
    }

    if (
      trimmedTaskDue < getTodayString() ||
      (trimmedTaskDue === getTodayString() && trimmedTaskTime < getNowString())
    ) {
      setErrorMassage("Please select a future date and time");
      return;
    }

    editTask(task.id, trimmedTaskName, trimmedTaskDue, trimmedTaskTime);
    closeModal();
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            id="task-name"
            className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-700"
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            autoFocus
          />
        </div>

				{!isCompleted && 
					<div>
						<input
							className="mt-2 w-40 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-700"
							type="date"
							min={getTodayString()}
							value={taskDueDate}
							onChange={(e) => setTaskDueDate(e.target.value)}
							required
						/>
						<input
							className="mt-2 ml-2 w-40 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-700"
							type="time"
							value={taskDueTime}
							min={taskDueDate === getTodayString() ? getNowString() : "00:00"}
							onChange={(e) => setTaskDueTime(e.target.value)}
							required
						/>
					</div>
				}

        {errorMassage && <p className="text-red-500">{errorMassage}</p>}

        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100 active:bg-gray-200"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 active:bg-gray-900"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default EditTaskForm;
