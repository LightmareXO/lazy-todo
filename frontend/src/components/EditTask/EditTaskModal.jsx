import Modal from "react-modal";
import EditTaskForm from "./EditTaskForm";

Modal.setAppElement("#root");

export default function EditTaskModal({ inEditing, editTask, setInEditing }) {
  const closeModal = () => {
    setInEditing(null);
  };

  return (
    <div>
      <>
        <Modal
          isOpen={inEditing !== null}
          onRequestClose={closeModal}
          className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl outline-none"
          overlayClassName="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          {inEditing && 
            <EditTaskForm key={inEditing.id} editTask={editTask} task={inEditing} closeModal={closeModal} isCompleted={inEditing.completed}/>
          }
        </Modal>
      </>
    </div>
  );
}
