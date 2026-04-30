
import { SidebarData } from './SidebarData'

function Sidebar() {
  return (
    <div className='w-50 h-screen bg-gray-200 text-gray-800 select-none'>
      <div className='text-center p-4 border-b border-gray-500 '>
        LAZY TODO
      </div>
      <ul className='m-2 space-y-2'>
        {SidebarData.map((value, key) => {
          return (
            <li key={key} className='flex px-2 py-2 hover:bg-gray-300 active:bg-gray-400 rounded-md cursor-pointer'>
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