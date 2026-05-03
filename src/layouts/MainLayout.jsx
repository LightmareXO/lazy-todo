import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"
import { useState } from "react"
import { uuidv7 } from 'uuidv7'

function MainLayout() {
	const [tasks, setTasks] = useState(
		[
			{ id: uuidv7(), name: 'test task1', dueDate: '2026-06-01', dueTime: '12:00', completed: false },
			{ id: uuidv7(), name: 'test task2', dueDate: '2026-06-01', dueTime: '10:00', completed: false },
			{ id: uuidv7(), name: 'test task3', dueDate: '2026-05-29', dueTime: '12:00', completed: false },
		]
	)

	const addTask = (taskName, taskDueDate, taskDueTime) => {
		if (taskName.trim() === '') return
		setTasks([...tasks, { id: uuidv7(), name: taskName, dueDate: taskDueDate, dueTime: taskDueTime, completed: false }])
	}

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}
	const toggleTask = (id) => {
		setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
	}

	const [sortMode, setSortMode] = useState('created');

	const toggleSortMode = () => {
		setSortMode((prev) => prev === 'created' ? 'dueDate' : 'created')
	}

	const sortedTasks = [...tasks].sort((a, b) => {
		if (sortMode === 'created') return a.id.localeCompare(b.id)
		if (sortMode === 'dueDate') {
			if (a.dueDate === b.dueDate) return a.dueTime.localeCompare(b.dueTime)
			return a.dueDate.localeCompare(b.dueDate)
		}

		return 0
	})

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet context={{ tasks, addTask, deleteTask, toggleTask, sortedTasks, sortMode, toggleSortMode }}/>
      </main>
    </div>
  )
}

export default MainLayout