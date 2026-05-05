
function Settings() {

  const handleDeleteData = () => {
    const shouldDelete = window.confirm(`全データを削除しますか？`)

    if (!shouldDelete) return
    
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <button className="border p-2 rounded-lg text-red-500 hover:bg-red-100" onClick={handleDeleteData}>
        Delete All Data
      </button>
    </>
  )
}

export default Settings