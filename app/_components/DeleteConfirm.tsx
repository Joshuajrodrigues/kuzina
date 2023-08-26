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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { TrashIcon } from "@radix-ui/react-icons";

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
    <>
      <AlertDialog
        onOpenChange={(openChange: boolean) => {
          handleOpen(openChange);
        }}
        open={isOpen}
      >
        <AlertDialogTrigger
          asChild
          className="flex items-center justify-center"
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleOpen(true);
            }}
            variant={"destructive"}
          >
            <TrashIcon />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{descp}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button onClick={handleDelete} type="button">
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeleteConfirm;
