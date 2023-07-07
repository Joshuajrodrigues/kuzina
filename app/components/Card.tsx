import Image from 'next/image'
import React from 'react'

const Card:React.FC<{
    src:string,
    alt:string,
    name:string
}> = ({src,alt,name}) => {
  return (
    <div className='my-3 border flex'>
        <Image style={{
            objectFit:"cover"
        }} width={80} height={80} src={src} alt={alt} />
        {name}
    </div>
  )
}

export default Card