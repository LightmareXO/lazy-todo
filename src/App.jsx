import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList';
import { uuidv7 } from 'uuidv7';

function App() {
	const [tasks, setTasks] = useState([
		{ id: uuidv7(), name: 'test task'},
	])
	const [taskName, setTaskName] = useState('')


	const addTask = () => {
		if (taskName.trim() === '') return
		setTasks([...tasks, { id: uuidv7(), name: taskName}])
		setTaskName('')
	}

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	return (
		<div className="flex min-h-screen">
			<div className='flex-1 p-4'>
				<input 
					className='border'
					type="text"
					value={taskName}
					onChange={(e) => {setTaskName(e.target.value)}}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
							addTask()
						}
					}}
				/>
				<button
					className='testbtn'
					onClick={() => {
						addTask()
					}}
				>
					add
				</button>

				<div>remain: {tasks.length}</div>

				<TaskList tasks={tasks} deleteTask={deleteTask}/>

				
			</div>
		</div>
	)
}

export default App
