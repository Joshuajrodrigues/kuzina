"use client";

import { clientSupabase, filterOptions, sortOptions } from "@/lib/constants";
import { useParams } from "next/navigation";
import { IPantryList } from "../kitchen/[slug]/pantry/columns";
import CardItem from "./CardItem";
import Filter from "./Filter";
import FirstCard from "./FirstCard";
import LastCard from "./LastCard";
import MiddleCard from "./MiddleCard";
import Search from "./Search";
import TopCard from "./TopCard";
import useSWR from "swr";
import { getPantryList } from "@/services/Pantry";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const PantryList = () => {
  const kitchenid = useParams().slug;
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useSWR(
    ["/pantry/list", kitchenid,page],
    ([url, kitchenid,page]) => getPantryList(url, kitchenid,page)
  );

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
      <section className="px-5 m-5">
        {data?.map((item) => (
          <CardItem
            key={item.id}
            topCard={
              <TopCard
                name={item.item_name}
                quantity={item.quantity}
                unit={item.unit}
              />
            }
            firstCard={
              <FirstCard
                expiryDate={item.expiryDate}
                updatedOn={item?.updatedOn}
              />
            }
            middleCard={
              <MiddleCard isInList={item.isInList} price={item?.price} />
            }
            lastCard={<LastCard />}
          />
        ))}
      </section>
      <section className="m-5 p-5 flex justify-evenly">
        <Button disabled={page===0} onClick={()=>setPage(()=>page-5)}>
            Prev Page
        </Button>
        <Button onClick={()=>setPage(()=>page+5)}>
            Next Page
        </Button>
      </section>
    </div>
  );
};

export default PantryList;
