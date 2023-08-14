"use client";
import { Button } from "@/components/ui/button";
import { HeartFilledIcon, HeartIcon, SketchLogoIcon } from "@radix-ui/react-icons";
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
        <h6 className="flex items-center justify-center font-extralight text-sm"> <SketchLogoIcon className="mr-1" /> Price</h6>
        {price || "-"}
      </span>
      <span className="flex flex-col text-right">
        <Button
          onClick={(e) => e.stopPropagation()}
          variant={"outline"}
          className=" font-extralight text-sm"
        >
          {isInList ? (
            <>
              <HeartFilledIcon className="mr-1" /> Remove from list
            </>
          ) : (
            <>
            <HeartIcon className="mr-1" />
            Add to shopping list
            </>
          )}
        </Button>
      </span>
    </div>
  );
};

export default MiddleCard;
