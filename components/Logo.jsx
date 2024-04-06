import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image className='absolute left-8 top-[-6px] max-md:hidden'  src={'/logo.png'} alt="Logo" width={150} height={150} />
  )
}

export default Logo