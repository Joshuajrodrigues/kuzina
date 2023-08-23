"use client";

import { Button } from "@/components/ui/button";
import { filterOptions, sortOptions } from "@/lib/constants";
import { getPantryList } from "@/services/PantryService";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import CardItem from "./CardItem";
import Filter from "./Filter";
import FirstCard from "./FirstCard";
import LastCard from "./LastCard";
import MiddleCard from "./MiddleCard";
import Search from "./Search";
import TopCard from "./TopCard";
import { Pantry } from "@/types/pantry";
import ListRenderer from "./ListRenderer";

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
      {/* <section className="px-5 m-5">
        {res?.map((item) => (
          <CardItem
            key={item?.id}
            topCard={
              <TopCard
                name={item?.item_name!}
                quantity={item?.quantity!}
                unit={item?.unit!}
              />
            }
            firstCard={
              <FirstCard
                expiryDate={item?.expiry_date!}
                updatedOn={item?.last_updated!}
              />
            }
            middleCard={
              <MiddleCard price={item?.price!} id={item?.id!} isInList={item?.addedToCart||false} />
            }
            lastCard={<LastCard id={item?.id!} />}
          />
        ))}
      </section>
      {!!count&&count > 5 && (
        <section className=" m-5 p-5 flex justify-evenly  bottom-3">
          <Button disabled={page === 0} onClick={() => setPage(() => page - 5)}>
            Prev Page
          </Button>
          <Button disabled={page+5>=count} onClick={() => setPage(() => page + 5)}>Next Page</Button>
        </section>
      )} */}
    </div>
  );
};

export default PantryList;
