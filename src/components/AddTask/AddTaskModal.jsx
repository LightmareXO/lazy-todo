import { useState } from 'react'
import Modal from 'react-modal'

Modal.setAppElement('#root')

function AddTaskModal({ onAddTask, isOpenModal, onCloseModal }) {
  const getTomorrowString = () => {
  const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)

    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const date = String(tomorrow.getDate()).padStart(2, '0')

    return `${year}-${month}-${date}`
  }

	const getTodayString = () => {
		const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate())

    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const date = String(tomorrow.getDate()).padStart(2, '0')

    return `${year}-${month}-${date}`
  }

	const getNowString = () => {
		const now = new Date()
		const hour = String(now.getHours()).padStart(2, '0')
		const minute = String(now.getMinutes()).padStart(2, '0')

		return `${hour}:${minute}`
	}
	
  const [taskName, setTaskName] = useState('')
  const [taskDueDate, setTaskDueDate] = useState(getTomorrowString()) 
  const [taskDueTime, setTaskDueTime] = useState('23:59')

  const closeModal = () => {
    setTaskName('')
    setTaskDueDate(getTomorrowString())
    setTaskDueTime('23:59')
    onCloseModal()
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedTaskName = taskName.trim()
    const trimmedTaskDue = taskDueDate.trim()
    const trimmedTaskTime = taskDueTime.trim()
    if (trimmedTaskName === '' || trimmedTaskDue === '' || trimmedTaskTime === '') {
      return
    }

    onAddTask(trimmedTaskName, trimmedTaskDue, trimmedTaskTime)
    closeModal()
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  return (
    <>
      <Modal
        isOpen={isOpenModal}
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
              className="mt-2 w-40 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-700"
              type="date"
							min={getTodayString()}
							value={taskDueDate}
              onChange={(e) => setTaskDueDate(e.target.value)}
              required
            />
            <input
              className="mt-2 ml-2 w-40 rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-gray-700"
              type="time"
							value={taskDueTime}
							min={(taskDueDate === getTodayString()) ? getNowString() : '00:00'}
              onChange={(e) => setTaskDueTime(e.target.value)}
              required
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

export default AddTaskModal