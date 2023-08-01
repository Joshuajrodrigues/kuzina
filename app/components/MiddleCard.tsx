import { Button } from "@/components/ui/button";
import React, { FC } from "react";

const MiddleCard: FC<{
  price?: string;
  isInList?: boolean;
}> = ({ price, isInList }) => {
  return (
    <div
      className={"flex px-4 w-full justify-between items-center text-center"}
    >
      <span className="flex flex-col text-left">
        <h6 className=" font-extralight text-sm">Price</h6>
        {price || ""}
      </span>
      <span className="flex flex-col text-right">
        <Button onClick={(e)=>e.preventDefault()} variant={"outline"} className=" font-extralight text-sm">
         {
          isInList ? "Remove from list" :"Add to shopping list"
         } 
        </Button>
      </span>
    </div>
  );
};

export default MiddleCard;
