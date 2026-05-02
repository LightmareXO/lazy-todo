
const Task = ({task, deleteTask, toggleTask}) => {
  return (
    <>
      <div className="flex items-center">
        <i className=""></i>
        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)}/>
        <span className="w-30">{task.name}</span>
        <span className="w-30">{task.dueDate}</span>
        <span className="w-30">{task.dueTime}</span>
        <button className="testbtn" onClick={() => {
          deleteTask(task.id)
        }}>
          delete
        </button>
      </div>
    </>
  )
}

export default Task