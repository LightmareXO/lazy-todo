import Task from './Task'

const TaskList = ({ tasks, deleteTask, toggleTask, setInEditing }) => {
  return (
	<>
      {tasks.map((task) => <Task key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask} setInEditing={setInEditing}/>)}
	</>
	)
}

export default TaskList