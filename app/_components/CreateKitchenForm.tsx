"use client";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export const addKitchenSchema = z.object({
  kitchenName: z.string().min(2).max(50),
});

const CreateKitchenForm = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof addKitchenSchema>>({
    resolver: zodResolver(addKitchenSchema),
    defaultValues: {
      kitchenName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addKitchenSchema>) {
    console.log("values", values);
    fetch("/api/kitchen/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => {
        toast({
          description: "Your kitchen has been created ",
        });
        form.reset();
      })
      .finally(() => {
        setIsDialogOpen(false);
      });
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button variant={"default"} type="button" className=" text-l">
          Create a new kitchen
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create kitchen</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 text-left"
          >
            <FormField
              control={form.control}
              name="kitchenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Something cool and unique to you !
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="my-5" type="submit">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateKitchenForm;
