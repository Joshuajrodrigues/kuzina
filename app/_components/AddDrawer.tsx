"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { ReactNode, useEffect, useState } from "react";
import AddItemForm from "./AddItemForm";
import { getPantryItem } from "@/services/PantryService";
import { useParams } from "next/navigation";
import { Pantry } from "@/types/pantry";
import AddRecipesForm from "./AddRecipesForm";
import { PostgrestError } from "@supabase/supabase-js";
import { Recipe, RecipeEdit } from "@/services/RecipesService";
import useGetWidth from "@/lib/hooks/useGetWidth";

const AddDrawer = ({
  title = "Add item",
  apiToMutate,
  triggerName = (
    <>
      {" "}
      <PlusCircledIcon className="mr-2 h-4 w-4" />
      Add item
    </>
  ),
  editItemId,
  recipeForm = false,
  editService = getPantryItem,
}: {
  title?: string;
  apiToMutate?: string;
  triggerName?: string | ReactNode;
  editItemId?: string;
  recipeForm?: boolean;
  editService?: (
    id: string,
    kitchenId: string
  ) => Promise<{
    data: Pantry | RecipeEdit | null;
    error: PostgrestError | null;
  }>;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [itemEditData, setItemEditData] = useState<Pantry | RecipeEdit| null | undefined>(
    null
  );
 
    const { height, width } = useGetWidth();
  const kitchenId = useParams().slug;

  const handleGetItemDetails = async (
    editItemId: string,
    kitchenId: string
  ) => {
    try {
      const { data, error } = await editService(editItemId, kitchenId);
      if (error) throw error;
      if (data) {
        console.log("data", data);

        setItemEditData(data);
        setIsDrawerOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Sheet
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setIsDrawerOpen(isOpen);
          setIsEditClicked(false);
        }
      }}
      open={isDrawerOpen}
    >
      <SheetTrigger asChild>
        <Button
          className=" bg-secondary text-primary hover:text-white"
          onClick={async (e) => {
            e.stopPropagation();
            if (editItemId) {
              await handleGetItemDetails(editItemId, kitchenId as string);
            } else {
              setIsDrawerOpen(true);
            }
          }}
        >
          {triggerName}
        </Button>
      </SheetTrigger>

      <SheetContent
        className="h-full overflow-auto"
        onClick={(e) => e.stopPropagation()}
        side={width! <768?"bottom":"right"}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          {!!itemEditData && (
            <div className="flex justify-end">
              <Button className=" bg-secondary text-primary" onClick={() => setIsEditClicked(true)}>
                {!isEditClicked ? "Edit" : "Editing"}
              </Button>
            </div>
          )}
          {!recipeForm ? (
            <AddItemForm
              apiToMutate={apiToMutate}
              isEditClicked={isEditClicked}
              closeDrawer={() => {
                setIsEditClicked(false);
                setIsDrawerOpen(false);
                setItemEditData(null);
              }}
              prefillData={itemEditData as Pantry}
            />
          ) : (
            <AddRecipesForm
              apiToMutate={apiToMutate}
              isEditClicked={isEditClicked}
              closeDrawer={() => {
                setIsEditClicked(false);
                setIsDrawerOpen(false);
                setItemEditData(null);
              }}
              prefillData={itemEditData as RecipeEdit}
            />
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default AddDrawer;
