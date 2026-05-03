import TaskList from "../components/TaskList/TaskList";
import AddTaskButton from "../components/AddTask/AddTaskButton";
import AddTaskModal from "../components/AddTask/AddTaskModal";
import SortButton from "../components/SortButton";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";


function Home() {
	const { addTask, deleteTask, toggleTask, sortedTasks, sortMode, toggleSortMode } = useOutletContext()
	const [isOpenModal, setIsOpenModal] = useState(false)


	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-4">
        <div className="h-40 overflow-y-auto">
          remain: {sortedTasks.filter((task) => !task.completed).length}
          <TaskList
            tasks={sortedTasks.filter((task) => !task.completed)}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        </div>

        <div className="my-4 h-30">
          completed
          <TaskList
            tasks={sortedTasks.filter((task) => task.completed)}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        </div>

        <AddTaskButton onOpen={openModal} />
        <AddTaskModal
          onAddTask={addTask}
          isOpenModal={isOpenModal}
          onCloseModal={closeModal}
        />
				
				<SortButton sortMode={sortMode} toggleSortMode={toggleSortMode} />
      </div>
    </div>
  );
}

export default Home;
