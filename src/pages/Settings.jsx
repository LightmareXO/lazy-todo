
function Settings() {

  const handleDeleteData = () => {
    const shouldDelete = window.confirm(`全データを削除しますか？`)

    if (!shouldDelete) return
    
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <h1 className="text-3xl pb-2 border-b border-gray-400">Settings</h1>
      <button className="border my-4 p-2 rounded-lg text-red-500 hover:bg-red-100" onClick={handleDeleteData}>
        Delete All Data
      </button>
    </>
  )
}

export default Settings