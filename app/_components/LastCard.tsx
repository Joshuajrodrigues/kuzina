"use client";
import { Button } from "@/components/ui/button";
import { deletePantryItem } from "@/services/PantryService";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { mutate } from "swr";
import AddDrawer from "./AddDrawer";
import DeleteConfirm from "./DeleteConfirm";
import { useToast } from "@/components/ui/use-toast";

const LastCard = ({ id,apiToMutate }: { id: string,apiToMutate:string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const kitchenId = useParams().slug;
  const { toast } = useToast();
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const { error } = await deletePantryItem(id, kitchenId);
      if (error) {
        let desc = "";
        if (error.message.includes("violates foreign key")) {
          desc = "Item most likely used in a recipie";
        } else {
          desc = "Something went wrong";
        }
        toast({
          title: "Could not delete",
          description: desc,
          variant: "destructive",
          duration: 2000,
        });
        throw error;
      }
      toast({
        title: "Item deleted",
        duration: 2000,
      });
      mutate([apiToMutate, kitchenId, 0]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex px-4 justify-between">
      <DeleteConfirm
        isOpen={isOpen}
        handleOpen={(e) => {
          setIsOpen(e);
        }}
        handleDelete={handleDelete}
      />
      <AddDrawer
        apiToMutate={apiToMutate}
        editItemId={id}
        title="View item"
        triggerName={
          <>
            <EyeOpenIcon className="mr-1" /> View More
          </>
        }
      />
    </div>
  );
};

export default LastCard;
