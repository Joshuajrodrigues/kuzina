import React, { FC } from 'react'

const TopCard:FC<{
    name:string,
    quantity:string
    unit:string
}> = ({name,quantity,unit}) => {
  return (
    <div className={"flex px-2 w-full justify-between items-center text-center"}>
        <p>
            {name}
        </p>
        <p>
            {quantity} {unit}
        </p>
    </div>
  )
}

export default TopCard