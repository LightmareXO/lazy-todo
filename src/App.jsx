import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList';
import { uuidv7 } from 'uuidv7';
import Sidebar from './components/Sidebar/Sidebar';
import AddTaskButton from './components/AddTaskButton';

function App() {
	const [tasks, setTasks] = useState([
		{ id: uuidv7(), name: 'test task', due: '2026-06-01' },
	])

	const addTask = (taskName, taskDue) => {
		if (taskName.trim() === '') return
		setTasks([...tasks, { id: uuidv7(), name: taskName, due: taskDue }])
	}

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	return (
		<div className="flex min-h-screen">
			<Sidebar/>
			<div className='flex-1 p-4'>
				
				<div>remain: {tasks.length}</div>

				<TaskList tasks={tasks} deleteTask={deleteTask}/>

				<AddTaskButton onAddTask={addTask}/>
			</div>
		</div>
	)
}

export default App
