import { useState } from "react";
import Modal from "react-modal";
import {
  getTodayDateString,
  getTomorrowDateString,
  toTimeString,
  validateTaskInput,
} from "../../lib/taskValidation";

Modal.setAppElement("#root");

function AddTaskModal({ onAddTask, isOpenModal, onCloseModal }) {
  const [taskName, setTaskName] = useState("");
  const [taskDueDate, setTaskDueDate] = useState(getTomorrowDateString());
  const [taskDueTime, setTaskDueTime] = useState("23:59");
  const [errorMessage, setErrorMessage] = useState("");

  const closeModal = () => {
    setTaskName("");
    setTaskDueDate(getTomorrowDateString());
    setTaskDueTime("23:59");
    setErrorMessage("");
    onCloseModal();
  };

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

    onAddTask(result.task.name, result.task.dueDate, result.task.dueTime);
    closeModal();
  };

  const todayDate = getTodayDateString();
  const currentTime = toTimeString(new Date());

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={closeModal}
        className="mx-4 w-full max-w-md rounded-lg bg-surface p-6 text-primary shadow-xl outline-none"
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="task-name"
              className="mt-2 w-full rounded-md border border-border-default bg-surface-input px-3 py-2 text-primary outline-none focus:border-gray-700 dark:focus:border-gray-400"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              autoFocus
              placeholder="example: math homework"
            />
          </div>

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
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default AddTaskModal;
