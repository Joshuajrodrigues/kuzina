"use client"
import { Button } from '@/components/ui/button'
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons'
import React from 'react'

const LastCard = () => {
  return (
    <div className='flex px-4 justify-between'>
        <Button onClick={(e)=>e.stopPropagation()} variant={"destructive"} className=' w-1/5'><TrashIcon/></Button>
        <Button onClick={(e)=>e.stopPropagation()} className=' w-3/4'><Pencil1Icon className="mr-1" /> Edit</Button>
    </div>
  )
}

export default LastCard