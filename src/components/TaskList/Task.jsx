
const Task = ({task, deleteTask}) => {
  return (
    <>
      <div className="flex items-center">
        <i className=""></i>
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