import Help from '@/app/_components/Help'
import { QuickNav } from '@/app/_components/QuickNav'
import RecipieList from '@/app/_components/RecipieList'
import React from 'react'

const page = () => {
  return (
    <>
    <div className=" px-5 mx-5 flex justify-between">
      <QuickNav />
      <Help description="A collection of your recipies"/>
    </div>
    <RecipieList/>
  </>
  )
}

export default page