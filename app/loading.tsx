import Image from 'next/image'
import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <Image height={75} width={75} src="/loading.svg" alt="" />
    </div>
  )
}

export default Loading
