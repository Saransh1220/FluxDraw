import React from 'react'

const Zoom = ({zoomOut, zoomIn}) => {
  return (
    <div className='bg-zinc-700/75 backdrop-blur-sm  flex items-center gap-2 rounded-md absolute bottom-4 left-[50%] translate-x-[-50%] '>
      <button className='px-3 py-2 hover:bg-zinc-600 rounded-l-md border-r-2 border-zinc-400/25'>
        <span className='text-sm w-full h-full pl-1'>-</span>
      </button>
      <span className=' '>100%</span>
      <button className='hover:bg-zinc-600 rounded-r-md px-3 py-2 border-l-2 border-zinc-400/25'>
        <span className='text-sm'>+</span>
      </button>
    </div>
  )
}

export default Zoom