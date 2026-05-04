import { useNavigate } from 'react-router-dom'
import { SidebarData } from './SidebarData'

function Sidebar() {
  const navigate = useNavigate()

  return (
    <div className='w-50 h-screen bg-gray-200 text-gray-800 select-none'>
      <div className="flex items-center gap-4 border-b border-gray-500 p-5">
        <img src="/favicon.svg" className="h-8 w-8" />
        <span className="font-bold tracking-wide">LAZY TODO</span>
      </div>
      <ul className='m-2 space-y-2'>
        {SidebarData.map((value, key) => {
          return (
            <li key={key} className='flex px-2 py-2 hover:bg-gray-300 active:bg-gray-400 rounded-md cursor-pointer'
              onClick={() => navigate(value.path)}
            >
              <i className={value.icon} />
              <span className='ml-5 text-lg'>{value.title}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Sidebar