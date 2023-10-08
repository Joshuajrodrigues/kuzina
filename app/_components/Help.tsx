"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircleIcon } from "lucide-react";
import { useState } from "react";

const Help = ({ description }: { description: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <TooltipProvider>
      <Tooltip open={open}>
        <TooltipTrigger asChild  onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
        onFocus={() => {
          setOpen(true);
        }}
        onBlur={() => {
          setOpen(false);
        }}>
        <Button  variant="outline" size="icon" >

          <HelpCircleIcon />
        </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="break-words m-1">{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Help;
