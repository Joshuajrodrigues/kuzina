import { ClockIcon, CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import React, { FC } from 'react'

const FirstCard:FC<{
    expiryDate?:string
    updatedOn?:string
}> = ({expiryDate,updatedOn}) => {
  return (
    <div className={"flex px-4 w-full justify-between items-center text-center"}>
        <span className='flex  flex-col text-left'>
            <h6 className='flex items-center justify-center  font-extralight text-sm'> <ClockIcon className="mr-1" /> Expiry date</h6>
            {expiryDate || "-"}
        </span>
        <span className='flex flex-col text-right'>
            <h6 className='flex items-center justify-center font-extralight text-sm'><CounterClockwiseClockIcon className="mr-1" /> Last updated on</h6>
            {updatedOn || "-"}
        </span>
    </div>
  )
}

export default FirstCard