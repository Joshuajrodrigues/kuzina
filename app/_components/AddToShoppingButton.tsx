"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { addToCart } from "@/services/PantryService";
import { addToFav } from "@/services/RecipesService";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  HeartFilledIcon,
  HeartIcon,
  ListBulletIcon,
  MinusCircledIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddToShoppingButton = ({
  isInList,
  id,
  isRecipe = false,
}: {
  isRecipe?: boolean;
  isInList: boolean;
  id: string;
}) => {
  const kitchenId = useParams().slug as string;
  const { toast } = useToast();
  const [added, setAdded] = useState(false);
  useEffect(() => {
    setAdded(isInList);
  }, [isInList]);

  const handleAddToCart = async () => {
    let newValue = !added;
    try {
      if (isRecipe) {
        const { data, error } = await addToFav(id, kitchenId, newValue);
        if (error) throw error;
        else if (data) {
          toast({
            title: newValue ? "Added to favourites" : "Removed from favourites",
            duration: 2000,
            variant: "default",
            type: "foreground",
            className: newValue ? "bg-green-300" : "bg-red-300",
          });
          setAdded(newValue);
        }
      } else {
        const { data, error } = await addToCart(id, kitchenId, newValue);
        if (error) throw error;
        else if (data) {
          toast({
            title: newValue ? "Added to wish list" : "Removed from wish list",
            duration: 2000,
            variant: "default",
            type: "foreground",
            className: newValue ? "bg-green-300" : "bg-red-300",
          });
          setAdded(newValue);
        }
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
          {isRecipe ? (
            <>
              {" "}
              <HeartFilledIcon className="mr-1" />
              Favourited{" "}
            </>
          ) : (
            <>
              <ListBulletIcon className="mr-1" /> In wish list
            </>
          )}
        </>
      ) : (
        <>
          {isRecipe ? (
            <>
              {" "}
              <HeartIcon className="mr-1" />
              Add to favourites{" "}
            </>
          ) : (
            <>
              <CheckCircledIcon className="mr-1" />
              Add to wish list
            </>
          )}
        </>
      )}
    </Button>
  );
};

export default AddToShoppingButton;
