import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import React from "react";

const Filter = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} className="h-8 border-dashed" variant={"outline"}>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

export default Filter;
