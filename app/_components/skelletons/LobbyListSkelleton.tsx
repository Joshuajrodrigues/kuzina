import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const LobbyListSkelleton = () => {
  return (
    <div className=" flex justify-between flex-col ">
    <Skeleton className="h-[80px] my-1  w-full" />
    <Skeleton className="h-[80px] my-1  w-full" />
    <Skeleton className="h-[80px] my-1  w-full" />
    </div>
  )
}

export default LobbyListSkelleton