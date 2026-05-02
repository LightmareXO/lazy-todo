import Task from './Task'

const TaskList = ({ tasks, deleteTask, toggleTask }) => {
  return (
	<>
      {tasks.map((task) => <Task key={task.id} task={task} deleteTask={deleteTask} toggleTask={toggleTask}/>)}
	</>
	)
}

export default TaskList