"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";

interface IFilterOptions {
  label: string;
  value: string;
}

const optionDefaults = [
  {
    label: "Running low",
    value: "rl",
  },
  {
    label: "Expiring soon",
    value: "es",
  },
  {
    label: "Wishlisted",
    value: "w",
  },
];

const Filter = () => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  //const selectedValues = new Set<string>(["Wishlisted"]);
  const [options, setOptions] = useState<IFilterOptions[]>(optionDefaults);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"sm"} className="h-8 border-dashed" variant={"outline"}>
          <PlusCircledIcon className="mr-2 h-4 w-4" /> Filter
          {selectedValues.length > 0 && (
            <>
              <Separator className="mx-2 h-4" orientation="vertical" />
              <div className="flex space-x-1 ">
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.includes(option.label))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={"Search filter"} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options?.map((option) => {
                const isSelected = selectedValues.includes(option.label);

                return (
                  <CommandItem key={option.value} onSelect={() => {
                    let newSelectedValues = structuredClone(selectedValues)
                    
                    if(isSelected){
                      const index = newSelectedValues.indexOf(option.label)
                      if (index > -1) { 
                        newSelectedValues.splice(index, 1); 
                      }
                      
                     setSelectedValues(newSelectedValues)
                    }else{
                      newSelectedValues.push(option.label)
                      setSelectedValues(newSelectedValues)
                    }
                    console.log("isSelected",isSelected,selectedValues);
                  }}>
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className={cn("h-4 w-4")} />
                    </div>
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
