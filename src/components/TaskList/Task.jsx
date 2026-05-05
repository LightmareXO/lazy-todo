import { useState, useEffect, useRef } from "react"

const Task = ({ task, deleteTask, toggleTask, setInEditing }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const handleDelete = () => {
    const shouldDelete = window.confirm(`「${task.name}」を削除しますか？`)

    if (!shouldDelete) return

    deleteTask(task.id)
    setIsMenuOpen(false)
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
        <div className="flex items-center rounded-lg h-10">
          {!task.completed && 
            <button className="bg-transparent text-gray-200 font-bold hover:text-gray-700 h-6 w-6 text-sm pt-0.5 pr-0.5 border border-gray-600 rounded-full hover:cursor-pointer" onClick={() => toggleTask(task.id)}>
            ✔
            </button>
          }
          <div className="ml-3 flex-1 text-lg font-bold text-gray-800">{task.name}</div>
          <div className="justify-end text-gray-500">Due:</div>
          <div className="ml-5 justify-end text-gray-500">{task.dueDate}</div>
          <div className="flex-1 ml-5 justify-end text-gray-500">{task.dueTime}</div>
          
          <div ref={menuRef} className="relative ml-auto hover:cursor-pointer">
            <span onClick={() => setIsMenuOpen(prev => !prev)}>
              <i className="ri-more-2-fill"></i>
            </span>

            {isMenuOpen && (
            <div className="absolute right-3 top-8 z-10 w-28 border border-gray-300 bg-white shadow">
              
              {task.completed && 
                <button
                  type="button"
                  className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                  onClick={() => {
                    setIsMenuOpen(false)
                    toggleTask(task.id)
                  }}
                >
                  Mark as incomplete
                </button>
              }
              
              <button
                type="button"
                className="block w-full px-3 py-2 text-left hover:bg-gray-100"
                onClick={() => {
                  setIsMenuOpen(false)
                  setInEditing(task)
                }}
              >
                edit
              </button>

              <button
                type="button"
                className="block w-full px-3 py-2 text-left text-red-400 hover:bg-gray-100"
                onClick={handleDelete}
              >
                delete
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
