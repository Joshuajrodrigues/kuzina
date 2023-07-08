"use client";

import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const AddDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger>
      <Button> <PlusCircledIcon className="mr-2 h-4 w-4"/> Add Item</Button>
      </SheetTrigger>
      <SheetContent side={"bottom"}>
        <SheetHeader>
          <SheetTitle>Add Item</SheetTitle>
          <SheetDescription>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi laboriosam commodi optio suscipit? Distinctio quas fuga similique excepturi saepe nemo earum hic, pariatur, temporibus minus, eius doloribus odit. Quibusdam, numquam?
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus quos, veniam, consequuntur quidem explicabo pariatur numquam fugit quo reprehenderit exercitationem sapiente consectetur saepe? Sed, ex unde ducimus distinctio ad aliquid?
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae rerum alias distinctio, repudiandae aspernatur beatae, atque vitae veritatis amet deserunt qui error quisquam eos. Accusantium eos autem libero? Quod, perspiciatis.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AddDrawer;
