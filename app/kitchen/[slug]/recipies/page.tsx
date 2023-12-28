import Help from '@/app/_components/Help'
import { QuickNav } from '@/app/_components/QuickNav'
import RecipieList from '@/app/_components/RecipieList'
import React from 'react'

const page = () => {
  return (
    <>
    <div className=" px-5 mx-5 flex justify-between  md:px-24 lg:px-32 xl:px-64">
      <QuickNav />
      <Help description="A collection of your recipes"/>
    </div>
    <RecipieList/>
  </>
  )
}

export default page