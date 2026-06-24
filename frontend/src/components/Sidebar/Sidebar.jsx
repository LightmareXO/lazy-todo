import { useLocation, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { useEffect, useState } from "react";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="md:w-50 w-15 h-screen select-none bg-surface-sidebar text-sidebar">
      <div className="flex justify-center items-center gap-4 border-b border-gray-500 py-5 dark:border-gray-700">
        <img src="/favicon.svg" className="h-8 w-8 dark:invert" />
        {windowWidth >= 768 && (
          <span className="font-bold tracking-wide">LAZY TODO</span>
        )}
      </div>
      <ul className="m-2 space-y-2">
        {SidebarData.map((value, key) => {
          const isActive = location.pathname === value.path;

          return (
            <li
              key={key}
              className={`flex not-md:justify-center px-2 py-2 rounded-md cursor-pointer ${isActive ? "bg-gray-300 active:bg-gray-300 dark:bg-gray-700 dark:active:bg-gray-700" : "hover:bg-gray-300 active:bg-gray-400 dark:hover:bg-gray-800 dark:active:bg-gray-700"}`}
              onClick={() => navigate(value.path)}
            >
              <i className={value.icon} />
              <span className="hidden md:inline ml-5 text-lg font-bold">
                {value.title}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
