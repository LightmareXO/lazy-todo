import TaskList from "../components/TaskList/TaskList";
import AddTaskButton from "../components/AddTask/AddTaskButton";
import AddTaskModal from "../components/AddTask/AddTaskModal";
import { uuidv7 } from 'uuidv7';
import { useState } from "react";


function Home() {
	const [tasks, setTasks] = useState([
		{ id: uuidv7(), name: 'test task', dueDate: '2026-06-01', dueTime: '12:00', completed: false },
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

	const openModal = () => setIsOpenModal(true)
	const closeModal = () => setIsOpenModal(false)
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-4">
        <div>
          remain: {tasks.filter((task) => !task.completed).length}
          <TaskList
            tasks={tasks.filter((task) => !task.completed)}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
          />
        </div>

        <div className="my-4">
          completed
          <TaskList
            tasks={tasks.filter((task) => task.completed)}
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
      </div>
    </div>
  );
}

export default Home;
