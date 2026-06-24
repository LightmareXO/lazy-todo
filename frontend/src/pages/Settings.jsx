import { useOutletContext } from "react-router-dom";

function Settings() {
  const { theme, setTheme } = useOutletContext();
  const handleDeleteData = () => {
    const shouldDelete = window.confirm(`Delete all data?`);

    if (!shouldDelete) return;

    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <h1 className="text-3xl pb-2 border-b border-gray-400 dark:border-gray-600">
        Settings
      </h1>
      <div className="my-4">
        <label htmlFor="theme" className="block text-lg font-bold">
          Theme
        </label>
        <select
          id="theme"
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
          className="mt-2 rounded-md border border-border-default bg-surface-input px-3 py-2 text-primary outline-none focus:border-gray-700 dark:focus:border-gray-400"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </div>
      <button
        className="border my-4 rounded-lg p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-950"
        onClick={handleDeleteData}
      >
        Delete All Data
      </button>
    </>
  );
}

export default Settings;
