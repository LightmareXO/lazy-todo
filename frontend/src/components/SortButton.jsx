function SortButton({ sortMode, toggleSortMode }) {
  return (
    <>
      <button
        onClick={toggleSortMode}
        className="transition-transform border rounded-full border-border-default w-9 h-9 hover:-rotate-90 active:bg-gray-300 mr-2 dark:active:bg-gray-700"
      >
        <i className="ri-loop-left-line"></i>
      </button>
      <button
        onClick={toggleSortMode}
        className="border rounded-md border-border-default px-4 h-9 hover:bg-gray-200 active:bg-gray-300 dark:hover:bg-gray-800 dark:active:bg-gray-700"
      >
        Sort by: {sortMode === "created" ? "Created" : "Due Date"}
      </button>
    </>
  );
}

export default SortButton;
