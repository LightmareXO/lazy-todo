import { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function AddTaskButton({ onAddTask }) {
  const [isOpen, setIsOpen] = useState(false)
  const [taskName, setTaskName] = useState('')
  const [taskDue, setTaskDue] = useState('2026-06-01') 

  const closeModal = () => {
    setIsOpen(false)
    setTaskName('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedTaskName = taskName.trim()
    const trimmedTaskDue = taskDue.trim()
    if (trimmedTaskName === '') return
    if (trimmedTaskDue === '') return

    onAddTask(trimmedTaskName, trimmedTaskDue)
    closeModal()
  }

  return (
    <>
      <button
        type="button"
        className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-3xl leading-none text-white shadow-lg hover:bg-gray-700 active:bg-gray-900"
        onClick={() => setIsOpen(true)}
      >
        +
      </button>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl outline-none"
        overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              id="task-name"
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-700"
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              autoFocus
              placeholder='例: 数学の課題'
            />
          </div>

          <div>
            <input
              className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-700"
              type="date"
              onChange={(e) => setTaskDue(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-100 active:bg-gray-200"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-gray-700 active:bg-gray-900"
            >
              Add
            </button>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddTaskButton