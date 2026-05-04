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
      <div className="flex items-center">
        <i className=""></i>
        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)}/>
        <span className="w-30">{task.name}</span>
        <span className="w-30">{task.dueDate}</span>
        <span className="w-30">{task.dueTime}</span>
        
        <div ref={menuRef} className="relative ml-auto">
          <span onClick={() => setIsMenuOpen(prev => !prev)}>
            <i className="ri-more-2-fill"></i>
          </span>

          {isMenuOpen && (
          <div className="absolute right-0 top-8 z-10 w-28 border border-gray-300 bg-white shadow">
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
    </>
  )
}

export default Task
