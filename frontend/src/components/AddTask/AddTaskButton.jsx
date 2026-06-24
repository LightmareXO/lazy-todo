function AddTaskButton({ onOpen }) {
  return (
    <>
      <button
        type="button"
        className="fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-3xl leading-none text-white shadow-lg hover:bg-gray-700 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 dark:active:bg-white"
        onClick={onOpen}
      >
        +
      </button>
    </>
  );
}

export default AddTaskButton;
