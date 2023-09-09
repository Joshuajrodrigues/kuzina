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

const AddDrawer = ({
  title = "Add item",
  apiToMutate,
  triggerName = (
    <>
      {" "}
      <PlusCircledIcon className="mr-2 h-4 w-4" />
      Add Item
    </>
  ),
  editItemId,
}: {
  title?: string;
  apiToMutate?: string;
  triggerName?: string | ReactNode;
  editItemId?: string;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [itemEditData, setItemEditData] = useState<Pantry | null | undefined>(
    null
  );
  const kitchenId = useParams().slug;

  const handleGetItemDetails = async (
    editItemId: string,
    kitchenId: string
  ) => {
    try {
      const { data, error } = await getPantryItem(editItemId, kitchenId);
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
          onClick={async (e) => {
            e.stopPropagation();
            if (editItemId) {
              await handleGetItemDetails(editItemId, kitchenId);
            } else {
              setIsDrawerOpen(true);
            }
          }}
        >
          {triggerName}
        </Button>
      </SheetTrigger>
      <SheetContent onClick={(e) => e.stopPropagation()} side={"bottom"}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          {!!itemEditData && (
            <div className="flex justify-end">
              <Button onClick={() => setIsEditClicked(true)}>
                {!isEditClicked ? "Edit" : "Editing"}
              </Button>
            </div>
          )}
          <AddItemForm
            apiToMutate={apiToMutate}
            isEditClicked={isEditClicked}
            closeDrawer={() => {
              setIsEditClicked(false);
              setIsDrawerOpen(false);
              setItemEditData(null);
            }}
            prefillData={itemEditData}
          />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default AddDrawer;
