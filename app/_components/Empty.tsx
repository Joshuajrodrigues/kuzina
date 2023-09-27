import React, { ReactNode } from 'react'
import {PackageOpen} from 'lucide-react'
import { Card } from '@/components/ui/card'
const Empty = ({message,icon=<PackageOpen size={64} />}:{message:string,icon?:ReactNode}) => {
  return (
    <Card className='flex p-3 mt-5 flex-col justify-center items-center'>
    {icon}
    <div>{message}</div>
    </Card>
  )
}

export default Empty