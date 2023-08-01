import React, { FC } from 'react'

const FirstCard:FC<{
    expiryDate?:string
    updatedOn?:string
}> = ({expiryDate,updatedOn}) => {
  return (
    <div className={"flex px-4 w-full justify-between items-center text-center"}>
        <span className='flex flex-col text-left'>
            <h6 className=' font-extralight text-sm'>Expiry date</h6>
            {expiryDate || "-"}
        </span>
        <span className='flex flex-col text-right'>
            <h6 className=' font-extralight text-sm'>Last updated on</h6>
            {updatedOn || "-"}
        </span>
    </div>
  )
}

export default FirstCard