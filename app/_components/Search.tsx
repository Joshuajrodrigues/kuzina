import { Input } from '@/components/ui/input'
import React, { ChangeEvent } from 'react'

const Search = ({
  onChange
}:{
  onChange:(query:ChangeEvent<HTMLInputElement>)=>void
}) => {
  return (
    <div className='m-5 px-5 ' >
      <Input onChange={onChange} name='search' id='search' placeholder='Search' className='w-full border-black border p-2 ' type="text" />
    </div>
  )
}

export default Search