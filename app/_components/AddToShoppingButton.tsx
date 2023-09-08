"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addToCart } from "@/services/PantryService";
import { CheckCircledIcon, CrossCircledIcon, HeartFilledIcon, HeartIcon, ListBulletIcon, MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddToShoppingButton = ({
  isInList,
  id,
}: {
  isInList: boolean;
  id: string;
}) => {
  const kitchenId = useParams().slug;
  const { toast } = useToast();
  const [added, setAdded] = useState(false);
  useEffect(() => {
    setAdded(isInList);
  }, [isInList]);
  const handleAddToCart = async () => {
    let newValue = !added;
    try {
      const { data, error } = await addToCart(id, kitchenId, newValue);
      if (error) throw error;
      else if (data) {
        toast({
          title: newValue ? "Added to wish list" : "Removed from wish list",
          duration: 2000,
          variant:"default",
          type:"foreground",
          className:newValue?"bg-green-300":"bg-red-300"
        });
        setAdded(newValue);
      }
    } catch (error) {}
  };

  return (
    <Button
      onClick={(e) => {
        e.stopPropagation();
        handleAddToCart();
      }}
      variant={"outline"}
      className=" font-extralight text-sm"
    >
      {added ? (
        <>
          <ListBulletIcon className="mr-1" /> In wish list
        </>
      ) : (
        <>
          <CheckCircledIcon className="mr-1" />
         Add to wish list
        </>
      )}
    </Button>
  );
};

export default AddToShoppingButton;
