import { GiHamburgerMenu } from "react-icons/gi";
import { FaSave } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const handleclick = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }
  return (
    <>
    <button onClick={handleclick} className='absolute bottom-4 left-8 text-2xl bg-zinc-700 p-2 rounded-lg'>
       <GiHamburgerMenu />
    </button>
      {isSidebarOpen && (
        <div className='absolute bottom-20 left-8 rounded-lg bg-zinc-700'>
          <ul className='flex flex-col gap-4 '>
            <li className="hover:bg-zinc-600 py-3 px-4 rounded-lg"><Link href='#'>Home</Link></li>
            <li className="hover:bg-zinc-600 py-3 px-4 rounded-lg">About</li>
            <li className="hover:bg-zinc-600 py-3 px-4 rounded-lg">Contact</li>
          </ul>
          <button className="flex items-center gap-10 hover:bg-zinc-600 py-3 px-4 rounded-lg"> Save<FaSave className="text-xl"/></button>
        </div>
      )}
    </>
    
  )
}

export default Sidebar