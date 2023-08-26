import { Skeleton } from "@/components/ui/skeleton";

const CardListSkelleton = () => {
  return (
    <div className="px-5 m-5 flex justify-between flex-col ">
      {/* <Skeleton className="h-[20px] my-5 w-full" />
    <Skeleton className="h-[20px] my-2 w-1/2" />
    <Skeleton className="h-[20px] my-2 w-1/2" />
    <Skeleton className="h-[20px] my-2 w-28" /> */}
      <Skeleton className="h-[80px] my-1 w-full" />
      <Skeleton className="h-[80px] my-1  w-full" />
      <Skeleton className="h-[80px] my-1  w-full" />
      <Skeleton className="h-[80px] my-1  w-full" />
      <Skeleton className="h-[80px] my-1  w-full" />
    </div>
  );
};

export default CardListSkelleton;
