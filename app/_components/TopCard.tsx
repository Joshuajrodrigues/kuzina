import { ArchiveIcon, CubeIcon } from '@radix-ui/react-icons'
import React, { FC } from 'react'

const TopCard:FC<{
    name:string,
    quantity:string
    unit:string
}> = ({name,quantity,unit}) => {
  return (
    <div className={"flex px-4 w-full justify-between items-center text-center"}>
        <span className='flex flex-col text-left'>
            <h6 className='flex items-center font-extralight text-sm'><CubeIcon className="mr-1"  /> Item name</h6>
            {name}
        </span>
        <span className='flex flex-col text-right'>
            <h6 className='flex items-center justify-center font-extralight text-sm'><ArchiveIcon className="mr-1"  /> Quantity</h6>
            {quantity} {unit}
        </span>
    </div>
  )
}

export default TopCard