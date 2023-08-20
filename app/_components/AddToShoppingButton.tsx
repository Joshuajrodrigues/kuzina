import { Button } from "@/components/ui/button";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import React from "react";

const AddToShoppingButton = ({ isInList }: { isInList: boolean }) => {
  return (
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
          Add to cart
        </>
      )}
    </Button>
  );
};

export default AddToShoppingButton;
