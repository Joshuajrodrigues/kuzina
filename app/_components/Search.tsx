import { Input } from '@/components/ui/input'
import React, { ChangeEvent } from 'react'

const Search = ({
  onChange
}:{
  onChange:(query:ChangeEvent<HTMLInputElement>)=>void
}) => {
  return (
    <div className='m-5 px-5 ' >
      <Input onChange={onChange} name='search' id='search' placeholder='Search' className='w-full  border p-2 text-primary' type="text" />
    </div>
  )
}

export default Search