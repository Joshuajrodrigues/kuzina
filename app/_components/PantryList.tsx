"use client";

import { filterOptions, sortOptions } from "@/lib/constants";
import { getPantryList } from "@/services/PantryService";
import { Pantry } from "@/types/pantry";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import Filter from "./Filter";
import ListRenderer from "./ListRenderer";
import Search from "./Search";
import AddDrawer from "./AddDrawer";
import { Skeleton } from "@/components/ui/skeleton";

const PantryList = () => {
  const kitchenid = useParams().slug;
  const [page, setPage] = useState(0);

  const { data, error, isLoading } = useSWR(
    ["[pantry]-list", kitchenid, page],
    ([url, kitchenid, page]) => getPantryList(url, kitchenid, page),{
      revalidateOnFocus:false,

    }
  );
  let count:number = data?.count!

  let res:Pantry[] = data?.data!
  if (error) return "Error loading list";

  if (isLoading) {
    return <div className="px-5 m-5 flex justify-between flex-col ">
          <Skeleton className="h-[20px] my-5 w-full"/>
          <Skeleton className="h-[20px] my-2 w-1/2"/>
          <Skeleton className="h-[20px] my-2 w-1/2"/>
          <Skeleton className="h-[20px] my-2 w-28"/>
        <Skeleton className="h-[80px] my-3 w-full"/>
        <Skeleton className="h-[80px] my-3  w-full"/>
        <Skeleton className="h-[80px] my-3  w-full"/>
        <Skeleton className="h-[80px] my-3  w-full"/>
        <Skeleton className="h-[80px] my-3  w-full"/>
    </div>;
  }
 
  
  return (
    <div>
      <Search />
      <div className="px-5 mx-5 flex justify-between flex-col ">
        <Filter
          filterOptions={filterOptions}
          filterName="Status"
          filterDefault={filterOptions[0].label}
        />
        <Filter
          isRadio
          filterOptions={sortOptions}
          filterName="Sort Order"
          filterDefault={sortOptions[0].label}
        />
      </div>
      <div className=" px-5 m-5 flex justify-between">
      <AddDrawer />
      </div>
      <ListRenderer apiToMutate={"[pantry]-list"} setPage={setPage} page={page} res={res} count={count}/>
  
    </div>
  );
};

export default PantryList;
