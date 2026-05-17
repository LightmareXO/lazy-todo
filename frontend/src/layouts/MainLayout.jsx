import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"
import { useEffect, useState } from "react"
import { uuidv7 } from 'uuidv7'

function MainLayout() {
	const [tasks, setTasks] = useState(() => {
		const savedTasks = JSON.parse(localStorage.getItem('tasks'))
		
		if (savedTasks) {
			return JSON.parse(localStorage.getItem('tasks'))
		}

		return [
			{ id: uuidv7(), name: 'example task', dueDate: '2030-01-01', dueTime: '12:00', completed: false },
			// { id: uuidv7(), name: 'test task2', dueDate: '2026-06-01', dueTime: '10:00', completed: false },
			// { id: uuidv7(), name: 'test task3', dueDate: '2026-05-29', dueTime: '12:00', completed: false },
			]
		}
	)

	const [settings, setSettings] = useState(() => {
		const savedSettings = JSON.parse(localStorage.getItem('settings'))
		
			if (savedSettings) {
				return JSON.parse(localStorage.getItem('settings'))
			}
			
			return {sortMode: 'dueDate'}
		}
	);

	const sortMode = settings.sortMode;

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	useEffect(() => {
		localStorage.setItem('settings', JSON.stringify(settings))
	}, [settings])

	const addTask = (taskName, taskDueDate, taskDueTime) => {
		if (taskName.trim() === '') return
		setTasks([...tasks, { id: uuidv7(), name: taskName, dueDate: taskDueDate, dueTime: taskDueTime, completed: false }])
	}

	const deleteTask = (id) => {
		setTasks(tasks.filter((task) => task.id !== id))
	}

	const deleteCompletedTasks = () => {
		setTasks(tasks.filter((task) => !task.completed))
	}

	const toggleTask = (id) => {
		setTasks(tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task))
	}

	const toggleSortMode = () => {
		setSettings((prev) => {
			return { ...prev, sortMode: prev.sortMode === 'created' ? 'dueDate' : 'created' }		
		})
	}

	const sortedTasks = [...tasks].sort((a, b) => {
		if (sortMode === 'created') return a.id.localeCompare(b.id)
		if (sortMode === 'dueDate') {
			if (a.dueDate === b.dueDate) return a.dueTime.localeCompare(b.dueTime)
			return a.dueDate.localeCompare(b.dueDate)
		}

		return 0
	})

	const editTask = (id, taskName, taskDueDate, taskDueTime) => {
		setTasks(tasks.map((task) => task.id === id ? { ...task, name: taskName, dueDate: taskDueDate, dueTime: taskDueTime } : task))
	}

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet context={{ tasks, addTask, deleteTask, deleteCompletedTasks, editTask, toggleTask, sortedTasks, sortMode, toggleSortMode }}/>
      </main>
    </div>
  )
}

export default MainLayout