import AddTaskButton from "../components/AddTask/AddTaskButton";
import AddTaskModal from "../components/AddTask/AddTaskModal";
import SortButton from "../components/SortButton";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
  const {
    addTask,
    deleteTask,
    toggleTask,
    sortedTasks,
    sortMode,
    toggleSortMode,
  } = useOutletContext();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const nextTask = sortedTasks.filter((task) => !task.completed)[0];

  const handleDelete = (task) => {
    const shouldDelete = window.confirm(`「${task.name}」を削除しますか？`)

    if (!shouldDelete) return

    deleteTask(task.id)
  }
  return (
    <div>
      <div className="p-4 space-y-40">
        {nextTask ? (
          <div className="relative flex justify-end rounded-lg border border-gray-300 bg-white p-6 shadow">

            <div className="">
              <p className="text-sm text-gray-500">Next Task:</p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                {nextTask.name}
              </h1>

              <div className="mt-4 text-sm text-gray-500">Due: </div>
              <div className="flex gap-4 text-gray-600">
                <span>{nextTask.dueDate}</span>
                <span>{nextTask.dueTime}</span>
              </div>
            </div>

            <div className="flex flex-auto p-8 items-center justify-end">
              <button
                onClick={() => toggleTask(nextTask.id)}
                className="rounded-full border border-gray-400 px-5 py-3 hover:bg-gray-200 active:bg-gray-300"
              >
                Done!
              </button>
            </div>

            <button 
              className="absolute top-2 right-2 hover:bg-gray-200 active:bg-gray-300 h-7 w-7 rounded-full" 
              onClick={() => handleDelete(nextTask)}
            >
              <i className="ri-delete-bin-line"></i>
            </button>

          </div>
        ) : (
          <div className="mt-6 max-w-xl rounded-lg border border-gray-300 bg-white p-6 shadow">
            <h1 className="text-3xl font-bold text-gray-900">
              All completed!
            </h1>
          </div>
        )}

        <SortButton sortMode={sortMode} toggleSortMode={toggleSortMode} />
      </div>
      <AddTaskButton onOpen={openModal} />
      <AddTaskModal
        onAddTask={addTask}
        isOpenModal={isOpenModal}
        onCloseModal={closeModal}
      />
    </div>
  );
}

export default Home;
