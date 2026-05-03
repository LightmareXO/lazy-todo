

function SortButton({ sortMode, toggleSortMode}) {
  return (
    <button onClick={toggleSortMode} className="border border-gray-400 p-2 hover:bg-gray-200 active:bg-gray-300">
      Sort by: {sortMode === 'created' ? 'Created' : 'Due Date'}
    </button>
  )
}

export default SortButton