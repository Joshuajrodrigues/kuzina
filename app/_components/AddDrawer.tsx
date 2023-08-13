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
import { useState } from "react";
import AddItemForm from "./AddItemForm";

const AddDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Sheet
      onOpenChange={(isOpen) => {
        setIsDrawerOpen(isOpen);
      }}
      open={isDrawerOpen}
    >
      <SheetTrigger asChild>
        <Button onClick={() => setIsDrawerOpen(true)}>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Add Item</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <AddItemForm
            closeDrawer={() => {
              setIsDrawerOpen(false);
            }}
          />
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default AddDrawer;
