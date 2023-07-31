import { Button } from '@/components/ui/button'
import { TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

const LastCard = () => {
  return (
    <div className='flex px-2 justify-between'>
        <Button className=' w-1/5 bg-red-500'><TrashIcon/></Button>
        <Button className=' w-3/4'>Edit</Button>
    </div>
  )
}

export default LastCard