import Task from './Task'

const TaskList = ({ tasks, deleteTask, toggleTask, setInEditing }) => {

	if (tasks.length === 0) return <p className="text-center text-2xl p-2">No tasks here!</p>

  return (
	<>
    {tasks.map((task) => <Task key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} setInEditing={setInEditing}/>)}
	</>
	)
}

export default TaskList