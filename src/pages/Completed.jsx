import TaskList from "../components/TaskList/TaskList"
import { useOutletContext } from "react-router-dom"
import SortButton from "../components/SortButton"

function Completed() {
  const { deleteTask, toggleTask, sortedTasks, sortMode, toggleSortMode } = useOutletContext()
  return (
    <>
      <div>
        <h1>Completed</h1>
        <TaskList
          tasks={sortedTasks.filter((task) => task.completed)}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      </div>
      <SortButton sortMode={sortMode} toggleSortMode={toggleSortMode} />
    </>
  )
}

export default Completed