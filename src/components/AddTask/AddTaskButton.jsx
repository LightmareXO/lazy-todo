
import Modal from 'react-modal'

Modal.setAppElement('#root')

function AddTaskButton({ onOpen }) {

  return (
    <>
      <button
        type="button"
        className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-3xl leading-none text-white shadow-lg hover:bg-gray-700 active:bg-gray-900"
        onClick={ onOpen }
      >
        +
      </button>
    </>
  )
}

export default AddTaskButton