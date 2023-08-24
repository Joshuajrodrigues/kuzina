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
    return "Loading....";
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
      <ListRenderer setPage={setPage} page={page} res={res} count={count}/>
  
    </div>
  );
};

export default PantryList;
