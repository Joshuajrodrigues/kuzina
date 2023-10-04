"use client";
import { Button } from "@/components/ui/button";
import {
  HeartFilledIcon,
  HeartIcon,
  SketchLogoIcon,
} from "@radix-ui/react-icons";
import React, { FC, ReactNode } from "react";
import AddToShoppingButton from "./AddToShoppingButton";
import { recipeTypes } from "@/lib/constants";

const MiddleCard: FC<{
  price?: number;
  isInList?: boolean;
  type?: string;
  id: string;
  icon?: ReactNode;
  isRecipe?: boolean;
}> = ({
  price,
  isInList,
  isRecipe = false,
  id,
  type,
  icon = <SketchLogoIcon className="mr-1" />,
}) => {
  return (
    <div
      className={"flex px-4 w-full justify-between items-center text-center"}
    >
      <span className="flex flex-col text-left">
        <h6 className="flex items-center justify-start font-extralight text-sm">
          {icon}
          {isRecipe ? <>Type</> : <>Price</>}
        </h6>
        {!isRecipe
          ? price || "-"
          : recipeTypes.find((item) => item.value === type)?.label}
      </span>
      <span className="flex flex-col text-right">
        <AddToShoppingButton isRecipe={isRecipe} id={id} isInList={isInList || false} />
      </span>
    </div>
  );
};

export default MiddleCard;
