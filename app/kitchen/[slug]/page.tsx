import Link from 'next/link'
import React from 'react'

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className='m-5 p-5 flex flex-col items-center'>
        <LinkButton href={`/kitchen/${params.slug}/pantry`} text='Pantry'/>
        <LinkButton href={`/kitchen/${params.slug}/recipies`} text='Recipies'/>
        <LinkButton href={`/kitchen/${params.slug}/shoppinglist`} text='Shopping List'/>
     
    </div>
  )
}


export default page

const LinkButton=({href,text}:{href:string,text:string})=>{
    return  <Link className='my-5 bg-primary rounded-md py-3 px-6  text-white' href={href}>{text}</Link>
}