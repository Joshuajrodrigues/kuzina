import React, { FC } from 'react'

const TopCard:FC<{
    name:string,
    quantity:string
    unit:string
}> = ({name,quantity,unit}) => {
  return (
    <div className={"flex px-2 w-full justify-between items-center text-center"}>
        <span className='flex flex-col text-left'>
            <h6 className=' font-extralight text-sm'>Item name</h6>
            {name}
        </span>
        <span className='flex flex-col text-right'>
            <h6 className=' font-extralight text-sm'>Quantity</h6>
            {quantity} {unit}
        </span>
    </div>
  )
}

export default TopCard