import Link from 'next/link'
import React from 'react'
import hero from "@/public/h1.svg";
import Image from 'next/image';

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <div className='m-5 p-5 flex flex-col items-center text-center'>
        <LinkButton href={`/kitchen/${params.slug}/pantry`} text='Pantry 📦'/>
        {/* <LinkButton href={`/kitchen/${params.slug}/recipies`} text='Recipies 📔'/> */}
        <LinkButton href={`/kitchen/${params.slug}/shoppinglist`} text='Wish List 📃'/>
        <Image alt='kitchen' src={hero} width={500} height={600} />
    </div>
  )
}


export default page

const LinkButton=({href,text}:{href:string,text:string})=>{
    return  <Link className='my-5 w-full bg-primary rounded-md py-3 px-6 text-white' href={href}>{text}</Link>
}