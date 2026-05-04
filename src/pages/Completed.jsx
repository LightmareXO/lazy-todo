import TaskList from "../components/TaskList/TaskList"
import { useOutletContext } from "react-router-dom"
import SortButton from "../components/SortButton"
import { useState } from "react"
import EditTaskModal from "../components/EditTask/EditTaskModal"

function Completed() {
  const { deleteTask, editTask, toggleTask, sortedTasks, sortMode, toggleSortMode } = useOutletContext()

  // 編集中のタスクが入る(1つだけ)
  const [inEditing, setInEditing] = useState(null);

  
  return (
    <>
      <div>
        <h1>Completed</h1>
        <TaskList
          tasks={sortedTasks.filter((task) => task.completed)}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
          setInEditing={setInEditing}
        />
      </div>
      <SortButton sortMode={sortMode} toggleSortMode={toggleSortMode} />

      <EditTaskModal inEditing={inEditing} editTask={editTask} setInEditing={setInEditing}/>
    </>
  )
}

export default Completed