"use client";
import { Button } from "@/components/ui/button";
import { deletePantryItem, getPantryItem } from "@/services/PantryService";
import { EyeOpenIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import React, { ReactNode, useState } from "react";
import { mutate } from "swr";
import AddDrawer from "./AddDrawer";
import DeleteConfirm from "./DeleteConfirm";
import { useToast } from "@/components/ui/use-toast";
import { PostgrestError } from "@supabase/supabase-js";
import { getRecipeItem } from "@/services/RecipesService";

const LastCard = ({
  id,
  apiToMutate,
  deleteService=deletePantryItem,
  recipeForm=false
}: {
  id: string;
  apiToMutate: string;
  deleteService?: (
    id: string,
    kitchenId: string
  ) => Promise<{
    error: PostgrestError | null;
  }>;
  recipeForm?:boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const kitchenId = useParams().slug;
  const { toast } = useToast();
  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const { error } = await deleteService(id, kitchenId as string);
      if (error) {
        toast({
          title: "Could not delete",
          variant: "destructive",
          duration: 2000,
        });
        throw error;
      }
      toast({
        title: "Item deleted",
        duration: 2000,
      });
      console.log("apiToMutate",apiToMutate);
      if(recipeForm){
        mutate([apiToMutate, kitchenId, 0, "",false,""]);
      }else{

        mutate([apiToMutate, kitchenId, 0, ""]);
      }
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
        title={!recipeForm?"View item":"View recipe"}
        recipeForm={recipeForm}
        editService={(id,kitchenId)=>recipeForm?getRecipeItem(id,kitchenId):getPantryItem(id,kitchenId)}
        triggerName={
          <>
            <EyeOpenIcon className="mr-1" /> View
          </>
        }
      />
    </div>
  );
};

export default LastCard;
