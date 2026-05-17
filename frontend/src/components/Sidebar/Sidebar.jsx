import { useLocation, useNavigate } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { useEffect, useState } from 'react'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className='md:w-50 w-15 h-screen bg-gray-200 text-gray-800 select-none'>
      <div className="flex justify-center items-center gap-4 border-b border-gray-500 py-5">
        <img src="/favicon.svg" className="h-8 w-8" />
        {windowWidth >= 768 &&
          <span className="font-bold tracking-wide">LAZY TODO</span>
        }
      </div>
      <ul className='m-2 space-y-2'>
        {SidebarData.map((value, key) => {
          const isActive = location.pathname === value.path

          return (
            <li key={key} className={`flex not-md:justify-center px-2 py-2 rounded-md cursor-pointer ${isActive ? 'bg-gray-300 active:bg-gray-300' : 'hover:bg-gray-300 active:bg-gray-400'}`}
              onClick={() => navigate(value.path)}
            >
              <i className={value.icon} />
              <span className='hidden md:inline ml-5 text-lg font-bold'>{value.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar
