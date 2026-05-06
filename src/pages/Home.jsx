import AddTaskButton from "../components/AddTask/AddTaskButton";
import AddTaskModal from "../components/AddTask/AddTaskModal";
import EditTaskModal from "../components/EditTask/EditTaskModal";
import SortButton from "../components/SortButton";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

function Home() {
  const {
    addTask,
    deleteTask,
    editTask,
    toggleTask,
    sortedTasks,
    sortMode,
    toggleSortMode,
  } = useOutletContext();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [inEditing, setInEditing] = useState(null);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const nextTask = sortedTasks.filter((task) => !task.completed)[0];
  const nextNextTask = sortedTasks.filter((task) => !task.completed)[1];

  const handleDelete = (task) => {
    const shouldDelete = window.confirm(`Delete "${task.name}"?`)

    if (!shouldDelete) return

    deleteTask(task.id)
  }
  return (
    <div>
      <SortButton sortMode={sortMode} toggleSortMode={toggleSortMode} />
      <div className="py-4 space-y-40">
        {nextTask ? (
          <div className="relative grid grid-cols-[minmax(0,70%)_30%] gap-4 rounded-lg border border-gray-300 bg-white p-6 shadow">

            <div className="min-w-0">
              <p className="text-sm text-gray-500">Next task:</p>

              <h1 className="mt-2 max-w-full text-3xl font-bold text-gray-900 break-all">
                {nextTask.name}
              </h1>

              <div className="mt-4 text-sm text-gray-500">Due: </div>
              <div className="flex gap-4 text-gray-600">
                <span>{nextTask.dueDate}</span>
                <span>{nextTask.dueTime}</span>
              </div>
            </div>

            <div>
              <div className="flex h-full mr-5 items-center justify-end">
                <button
                  onClick={() => toggleTask(nextTask.id)}
                  className="shrink-0 rounded-full border border-gray-400 px-5 py-3 hover:bg-gray-200 active:bg-gray-300 hover:cursor-pointer"
                >
                  Done!
                </button>
              </div>
              <button 
                className="absolute bottom-2 right-2 hover:bg-gray-200 active:bg-gray-300 h-7 w-7 rounded-full hover:cursor-pointer" 
                onClick={() => handleDelete(nextTask)}
              >
                <i className="ri-delete-bin-line"></i>
              </button>
              <button 
                className="absolute bottom-2 right-10 hover:bg-gray-200 active:bg-gray-300 h-7 w-7 rounded-full hover:cursor-pointer" 
                onClick={() => setInEditing(nextTask)}
              >
                <i className="ri-edit-line"></i>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-gray-300 bg-white p-6 shadow">
            <h1 className="text-3xl text-center font-bold text-gray-900">
              All completed!
            </h1>
          </div>
        )}
      </div>

      { nextTask &&
        <div className="flex justify-end text-gray-400">
          <span>Next up:</span>
          <span className="mx-2">{nextNextTask ? nextNextTask.name : "None"}</span>
        </div>
      }
      
      <AddTaskButton onOpen={openModal} />
      <AddTaskModal
        onAddTask={addTask}
        isOpenModal={isOpenModal}
        onCloseModal={closeModal}
      />
      <EditTaskModal
        inEditing={inEditing}
        editTask={editTask}
        setInEditing={setInEditing}
      />
    </div>
  );
}

export default Home;
