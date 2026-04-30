import { useState } from 'react'
import './App.css'
import TaskList from './components/TaskList/TaskList';
import { uuidv7 } from 'uuidv7';
import Sidebar from './components/Sidebar/Sidebar';
import AddTaskButton from './components/AddTask/AddTaskButton';
import AddTaskModal from './components/AddTask/AddTaskModal';


function App() {
	const [tasks, setTasks] = useState([
		{ id: uuidv7(), name: 'test task', due: '2026-06-01' },
	])
	const [isOpenModal, setIsOpenModal] = useState(false)

	const addTask = (taskName, taskDue) => {
		if (taskName.trim() === '') return
		setTasks([...tasks, { id: uuidv7(), name: taskName, due: taskDue }])
	}

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false) 

	return (
		<div className="flex min-h-screen">
			<Sidebar/>
			<div className='flex-1 p-4'>
				
				<div>remain: {tasks.length}</div>

				<TaskList tasks={tasks} deleteTask={deleteTask}/>

				<AddTaskButton onOpen={openModal}/>
				<AddTaskModal onAddTask={addTask} isOpenModal={isOpenModal} onCloseModal={closeModal}/>
			</div>
		</div>
	)
}

export default App
