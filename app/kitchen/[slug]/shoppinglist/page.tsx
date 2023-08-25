"use client";
import ListRenderer from "@/app/_components/ListRenderer";
import { QuickNav } from "@/app/_components/QuickNav";
import { Skeleton } from "@/components/ui/skeleton";
import { getCartList } from "@/services/CartService";
import { Pantry } from "@/types/pantry";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

const page = () => {
  const kitchenid = useParams().slug;
  const [page, setPage] = useState(0);
  const { data, error, isLoading } = useSWR(
    ["[shopping]-list", kitchenid, page],
    ([url, kitchenid, page]) => getCartList(url, kitchenid, page),
    {
      revalidateOnFocus: false,
    }
  );
  let count: number = data?.count!;

  let res: Pantry[] = data?.data!;
  if (error) return "Error loading list";

  if (isLoading) {
    return <>
    <Skeleton/>
    </>;
  }

  return (
    <div>
      <h3 className=" px-5 mx-5 flex justify-between text-xl">
        <QuickNav/>
      </h3>
      <ListRenderer apiToMutate={"[shopping]-list"} setPage={setPage} page={page} res={res} count={count} />
    </div>
  );
};

export default page;
