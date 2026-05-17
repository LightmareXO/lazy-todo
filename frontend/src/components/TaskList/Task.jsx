import { useState, useEffect, useRef } from "react"

const Task = ({ task, deleteTask, toggleTask, setInEditing }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const handleDelete = () => {
    const shouldDelete = window.confirm(`Delete "${task.name}"?`)

    if (!shouldDelete) return

    deleteTask(task.id)
    setIsMenuOpen(false)
  }

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";
  async function addToGoogleTasks(task) {
    const res = await fetch(`${API_BASE_URL}/api/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: task.name,
        dueDate: task.dueDate,
        dueTime: task.dueTime
      }),
    });

    const data = await res.json();

    window.open(data.authUrl, "_blank");
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className="p-2 my-4 border border-gray-400 rounded-lg">
        <div
          className={`relative grid items-center gap-3 rounded-lg ${
            task.completed
              ? "grid-cols-[minmax(0,7fr)_250px_32px]"
              : "grid-cols-[10px_minmax(0,6fr)_250px_32px]"
          }`}
        >
          
          {!task.completed && 
            <button className="items-center bg-transparent text-gray-200 font-bold hover:text-gray-700 h-6 w-6 text-sm pt-0.5 pr-0.5 border border-gray-600 rounded-full hover:cursor-pointer" onClick={() => toggleTask(task.id)}>
            ✔
            </button>
          }

          <div className="px-5 min-w-0 text-lg font-bold text-gray-800 truncate"> 
            {task.name}
          </div>
          
          <div>
            <span className=" text-gray-500">Due:</span>
            <span className="ml-5 text-gray-500">{task.dueDate}</span>
            <span className="ml-5 text-gray-500">{task.dueTime}</span>
          </div>
          
          <div ref={menuRef} className="relative ml-auto hover:cursor-pointer pr-4">
            <span onClick={() => setIsMenuOpen(prev => !prev)}>
              <i className="ri-more-2-fill"></i>
            </span>

            {isMenuOpen && (
            <div className="absolute right-3 top-8 z-10 w-28 border rounded-md border-gray-300 bg-white shadow">
              
              {task.completed && 
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left hover:bg-gray-200 border-b border-gray-300 active:bg-gray-300"
                  onClick={() => {
                    setIsMenuOpen(false)
                    toggleTask(task.id)
                  }}
                >
                  Mark as incomplete
                </button>
              }

              {
                !task.completed && 
                <button
                  type="button"
                  className="block w-full px-3 py-2 hover:bg-gray-200 border-b border-gray-300 active:bg-gray-300"
                  onClick={() => addToGoogleTasks(task)}
                >
                  To Google Calendar
                </button>
              }
              
              <button
                type="button"
                className="block w-full px-3 py-2 text-left hover:bg-gray-200 border-b border-gray-300 active:bg-gray-300"
                onClick={() => {
                  setIsMenuOpen(false)
                  setInEditing(task)
                }}
              >
                Edit
              </button>

              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-red-400 hover:bg-gray-200 active:bg-gray-300"
                onClick={handleDelete}
              >
                Delete
              </button>

            </div>
          )}

          </div>
        </div>
      </div>
    </>
  )
}

export default Task
