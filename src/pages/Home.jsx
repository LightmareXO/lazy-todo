import TaskList from "../components/TaskList/TaskList";
import AddTaskButton from "../components/AddTask/AddTaskButton";
import AddTaskModal from "../components/AddTask/AddTaskModal";
import SortButton from "../components/SortButton";
import { uuidv7 } from 'uuidv7';
import { useState } from "react";


function Home() {
	const [tasks, setTasks] = useState([
		{ id: uuidv7(), name: 'test task1', dueDate: '2026-06-01', dueTime: '12:00', completed: false },
		{ id: uuidv7(), name: 'test task2', dueDate: '2026-06-01', dueTime: '10:00', completed: false },
		{ id: uuidv7(), name: 'test task3', dueDate: '2026-05-29', dueTime: '12:00', completed: false },
	])
	const [isOpenModal, setIsOpenModal] = useState(false)

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

	const sortedTasks = tasks.sort((a, b) => {
		if (sortMode === 'created') return a.id.localeCompare(b.id)
		if (sortMode === 'dueDate') {
			if (a.dueDate === b.dueDate) return a.dueTime.localeCompare(b.dueTime)
			return a.dueDate.localeCompare(b.dueDate)
		}
	})


	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-4">
        <div className="h-40 overflow-y-auto">
          remain: {sortedTasks.filter((task) => !task.completed).length}
          <TaskList
            tasks={sortedTasks.filter((task) => !task.completed)}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        </div>

        <div className="my-4 h-30">
          completed
          <TaskList
            tasks={sortedTasks.filter((task) => task.completed)}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        </div>

        <AddTaskButton onOpen={openModal} />
        <AddTaskModal
          onAddTask={addTask}
          isOpenModal={isOpenModal}
          onCloseModal={closeModal}
        />
				
				<SortButton sortMode={sortMode} toggleSortMode={toggleSortMode} />
      </div>
    </div>
  );
}

export default Home;
