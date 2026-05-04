import AddTaskButton from "../components/AddTask/AddTaskButton";
import AddTaskModal from "../components/AddTask/AddTaskModal";
import SortButton from "../components/SortButton";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Task from "../components/TaskList/Task";


function Home() {
	const { addTask, deleteTask, toggleTask, sortedTasks, sortMode, toggleSortMode } = useOutletContext()
	const [isOpenModal, setIsOpenModal] = useState(false)


	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)
  return (
    <div>
      <div className="flex-1 p-4">
        <div className="h-40 overflow-y-auto">
          remain: {sortedTasks.filter((task) => !task.completed).length}
          <h1>Next:</h1>
          { sortedTasks.filter((task) => !task.completed).length > 0 ?
            <Task task={sortedTasks.filter((task) => !task.completed)[0]} deleteTask={deleteTask} toggleTask={toggleTask}/>
            :
            <p>All completed!</p>
          }
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
