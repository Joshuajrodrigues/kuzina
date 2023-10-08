"use client";

import { getPantryList } from "@/services/PantryService";
import { Pantry } from "@/types/pantry";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import AddDrawer from "./AddDrawer";
import ListRenderer from "./ListRenderer";
import Search from "./Search";
import CardListSkelleton from "./skelletons/CardListSkelleton";
const PantryList = () => {
  const kitchenid = useParams().slug as string;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useSWR(
    ["[pantry]-list", kitchenid, page, search],
    ([url, kitchenid, page]) => getPantryList(url, kitchenid, page, search),
    {
      revalidateOnFocus: false,
    }
  );
  let count: number = data?.count!;

  let res: Pantry[] = data?.data!;
  if (error) return "Error loading list";

  const debouncedSearch = AwesomeDebouncePromise((query) => {
    setSearch(query);
  }, 1500);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
  };
  return (
    <div className=" md:px-24 lg:px-32 xl:px-64">
      <Search onChange={handleSearchChange} />
      <div className=" px-5 m-5 flex justify-between">
        <AddDrawer apiToMutate="[pantry]-list" />
      </div>
      {isLoading ? (
        <CardListSkelleton />
      ) : (
        <>
          <ListRenderer
            apiToMutate={"[pantry]-list"}
            setPage={setPage}
            page={page}
            res={res}
            count={count}
          />
        </>
      )}
    </div>
  );
};

export default PantryList;
