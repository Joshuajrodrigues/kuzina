"use client";
import { Button } from "@/components/ui/button";
import { deletePantryItem } from "@/services/PantryService";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React from "react";
import { mutate } from "swr";
import AddDrawer from "./AddDrawer";

const LastCard = ({ id }: { id: number }) => {
  const kitchenId = useParams().slug;

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      await deletePantryItem(id, kitchenId);
      mutate(["[pantry]-list", kitchenId, 0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex px-4 justify-between">
      <Button onClick={handleDelete} variant={"destructive"} className="">
        <TrashIcon /> Delete
      </Button>
      <AddDrawer
        editItemId={id}
        title="Edit item"
        triggerName={
          <>
            <Pencil1Icon className="mr-1" /> Edit
          </>
        }
      />
    </div>
  );
};

export default LastCard;
