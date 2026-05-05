import TaskList from "../components/TaskList/TaskList"
import { useOutletContext } from "react-router-dom"
import SortButton from "../components/SortButton"
import { useState } from "react"
import EditTaskModal from "../components/EditTask/EditTaskModal"
import AddTaskButton from "../components/AddTask/AddTaskButton"
import AddTaskModal from "../components/AddTask/AddTaskModal"

function Completed() {
  const { deleteTask, editTask, addTask, deleteCompletedTasks, toggleTask, sortedTasks, sortMode, toggleSortMode } = useOutletContext()

  // 編集中のタスクが入る(1つだけ)
  const [inEditing, setInEditing] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => setIsOpenModal(true)
  const closeModal = () => setIsOpenModal(false)
  
  return (
    <>
      <h1 className="text-3xl">Completed</h1>
      <div className="py-2 border-b border-gray-400">
        <SortButton sortMode={sortMode} toggleSortMode={toggleSortMode} />
        <button
          className="border rounded-full ml-6 border-red-400 text-red-400 w-9 h-9 hover:bg-gray-200 active:bg-gray-300"
          onClick={() => {
            const shouldDelete = window.confirm("完了したタスクを全て削除しますか？");
            
            if (!shouldDelete) return
            
            deleteCompletedTasks()
          }}
        >
          <i className="ri-delete-bin-line"></i>
          
        </button>
      </div>
      <div>
        <TaskList
          tasks={sortedTasks.filter((task) => task.completed)}
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

export default Completed