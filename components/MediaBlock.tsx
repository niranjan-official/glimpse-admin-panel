import Image from 'next/image'
import React from 'react'

const MediaBlock = ({src}:{src: string}) => {
  return (
    <div className='w-[calc(50%-0.25rem)] h-24 bg-gray-500 overflow-hidden'>
      <Image src={src} className='h-full w-auto' width={100} height={60} alt="..." />
    </div>
  )
}

export default MediaBlock