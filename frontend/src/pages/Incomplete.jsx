import TaskList from "../components/TaskList/TaskList"
import { useOutletContext } from "react-router-dom"
import SortButton from "../components/SortButton"
import { useState } from "react"
import EditTaskModal from "../components/EditTask/EditTaskModal"
import AddTaskButton from "../components/AddTask/AddTaskButton"
import AddTaskModal from "../components/AddTask/AddTaskModal"

function Incomplete() {
  const { deleteTask, editTask, addTask, toggleTask, sortedTasks, sortMode, toggleSortMode } = useOutletContext()

  // 編集中のタスクが入る(1つだけ)
  const [inEditing, setInEditing] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => setIsOpenModal(true)
  const closeModal = () => setIsOpenModal(false)

  return (
    <>
      <h1 className="text-3xl">Incomplete</h1>
      <div className="py-2 border-b border-gray-400">
        <SortButton sortMode={sortMode} toggleSortMode={toggleSortMode} />
      </div>
      <div>
        <TaskList
          tasks={sortedTasks.filter((task) => !task.completed)}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          setInEditing={setInEditing}
        />
      </div>

      <EditTaskModal inEditing={inEditing} editTask={editTask} setInEditing={setInEditing}/>

      <AddTaskButton onOpen={openModal} />
      <AddTaskModal
        onAddTask={addTask}
        isOpenModal={isOpenModal}
        onCloseModal={closeModal}
      />
    </>
  )
}

export default Incomplete