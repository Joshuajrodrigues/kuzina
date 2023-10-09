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
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  MinusCircledIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import React, { FC, useState } from "react";

interface IFilteroption {
  label: string;
}

const Filter: FC<{
  filterOptions: IFilteroption[];
  filterName: string;
  filterDefault: string;
  isRadio?: boolean;
}> = ({ filterDefault, filterName, filterOptions, isRadio = false }) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([
    filterDefault,
  ]);
  //const selectedValues = new Set<string>(["Wishlisted"]);
  //const [filterOptions, setoptionDefaults] = useState<IFilteroptionDefaults[]>(filterOptions);
  let hasSelectedValues = selectedValues.length > 0;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          className="h-8 w-fit border-dashed mx-10 mb-3 "
          variant={"outline"}
        >
          {hasSelectedValues ? (
            <MinusCircledIcon className="mr-2 h-4 w-4" />
          ) : (
            <PlusCircledIcon className="mr-2 h-4 w-4" />
          )}
          {filterName}
          <Separator className="mx-2 h-4" orientation="vertical" />
          <div className="flex space-x-1 ">
            {selectedValues.length > 0 ? (
              <>
                {selectedValues.length > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.length} selected
                  </Badge>
                ) : (
                  filterOptions
                    .filter((option) => selectedValues.includes(option.label))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.label}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </>
            ) : (
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                All
              </Badge>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder={filterName} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {filterOptions?.map((option) => {
                const isSelected = selectedValues.includes(option.label);

                return (
                  <CommandItem
                    key={option.label}
                    onSelect={() => {
                      if (!isRadio) {
                        let newSelectedValues = structuredClone(selectedValues);
                        if (isSelected) {
                          const index = newSelectedValues.indexOf(option.label);
                          if (index > -1) {
                            newSelectedValues.splice(index, 1);
                          }
                          setSelectedValues(newSelectedValues);
                        } else {
                          newSelectedValues.push(option.label);
                          setSelectedValues(newSelectedValues);
                        }
                      } else {
                        setSelectedValues([option.label]);
                      }
                    }}
                  >
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
            {hasSelectedValues && !isRadio && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setSelectedValues([])}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Filter;
