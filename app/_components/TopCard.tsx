import { ArchiveIcon, CubeIcon } from '@radix-ui/react-icons'
import React, { FC, ReactNode } from 'react'

const TopCard:FC<{
    name:string,
    quantity?:number
    type?:string
    unit?:string,
    isRecipe?:boolean,
    nameHeader?:ReactNode
    nameHeaderIcon?:ReactNode
}> = ({name,quantity,unit,type,nameHeader="Item name",nameHeaderIcon=<CubeIcon className="mr-1"  />,isRecipe=false}) => {
  return (
    <div className={"flex px-4 w-full justify-between items-center text-center"}>
        <span className='flex flex-col text-left'>
            <h6 className='flex items-center font-extralight text-sm'>{nameHeaderIcon} {nameHeader}</h6>
            {name}
        </span>
        <span className='flex flex-col text-right'>
            <h6 className='flex items-center justify-center font-extralight text-sm'><ArchiveIcon className="mr-1"  />{isRecipe? "Type" : "Quantity"} </h6>
            {type || '-'} {quantity} {unit}
        </span>
    </div>
  )
}

export default TopCard