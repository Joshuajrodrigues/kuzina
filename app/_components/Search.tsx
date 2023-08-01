import { Input } from '@/components/ui/input'
import React from 'react'

const Search = () => {
  return (
    <div className='m-5 px-5 ' >
      <Input name='search' id='search' placeholder='Search' className='w-full border-black border p-2 ' type="text" />
    </div>
  )
}

export default Search