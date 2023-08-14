"use client";
import { Button } from "@/components/ui/button";
import { deletePantryItem } from "@/services/PantryService";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React from "react";
import { mutate } from "swr";

const LastCard = ({ id }: { id: string }) => {
  const kitchenId = useParams().slug;

  const handleDelete = async(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    try {
      await deletePantryItem(id, kitchenId);
      mutate(["[pantry]-list", kitchenId, 0]);
      
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="flex px-4 justify-between">
      <Button onClick={handleDelete} variant={"destructive"} className=" w-1/5">
        <TrashIcon />
      </Button>
      <Button onClick={(e) => e.stopPropagation()} className=" w-3/4">
        <Pencil1Icon className="mr-1" /> Edit
      </Button>
    </div>
  );
};

export default LastCard;
