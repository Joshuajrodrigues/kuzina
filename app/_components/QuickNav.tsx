"use client";

import * as React from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, ChevronDownIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

const menus = [
  {
    value: "Pantry list",
    route: "/kitchen/{id}/pantry",
    label: "Pantry list",
  },
  {
    value: "Wish list",
    route: "/kitchen/{id}/shoppinglist",
    label: "Wish list",
  },
];

const homeRoute = "/kitchen/{id}";

export function QuickNav() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const kitchenid = useParams().slug as string;

  const currentLink = menus.find(
    (item) => item.route.split("/").at(-1) === pathname.split("/").at(-1)
  );
  const [value, setValue] = React.useState(currentLink);

  return (
    <div className="w-full flex items-center justify-start">
      <Link href={homeRoute.replace("{id}", kitchenid)}>
        <HomeIcon className="mr-2" /> 
      </Link>
      <span className="mr-2">
        /
      </span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[150px] justify-between"
          >
            {value!.label}
            <ChevronDownIcon className="ml-2 " />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandGroup>
              {menus.map((framework) => (
                <CommandItem
                  key={framework.value}
                  onSelect={(currentValue) => {
                    let value = menus.find(
                      (item) => item.value.toLowerCase() === currentValue
                    );
                    setValue(value!);
                    setOpen(false);
                    let route = value?.route.replace("{id}", kitchenid);
                    router.push(route!);
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value!.label === framework.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
