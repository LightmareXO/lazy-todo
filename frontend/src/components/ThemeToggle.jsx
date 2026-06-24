function ThemeToggle({ isDark, onToggle }) {

  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-border-default bg-surface hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-800 dark:active:bg-gray-700"
    >
      <i className={isDark ? "ri-sun-line" : "ri-moon-line"} />
    </button>
  );
}

export default ThemeToggle;
