"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const DeleteConfirm = ({
  title = "Are you sure absolutely sure?",
  descp = "This action cannot be undone. This will permanently delete your item.",
  isOpen,
  handleDelete,
  handleOpen,
}: {
  title?: string;
  descp?: string;
  isOpen: boolean;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleOpen: (e: boolean) => void;
}) => {
  return (
    <Dialog
      onOpenChange={(openChange) => {
        handleOpen(openChange);
      }}
      open={isOpen}
    >
      <DialogTrigger asChild className="flex items-center justify-center">
        <Button
          onClick={(e) => {
            //   e.stopPropagation();
            //  e.preventDefault();
            handleOpen(true);
          }}
          variant={"destructive"}
        >
          <TrashIcon />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{descp}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete} type="button">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirm;
