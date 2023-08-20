"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/types/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


export const addKitchenSchema = z.object({
  kitchenName: z.string().min(2).max(50),
});

const CreateKitchenForm = ({ session,fetchKitchens }: { session: Session | null,fetchKitchens:()=>void }) => {
  const supabase = createClientComponentClient<Database>();
  const {toast} = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = session?.user;
  const form = useForm<z.infer<typeof addKitchenSchema>>({
    resolver: zodResolver(addKitchenSchema),
    defaultValues: {
      kitchenName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addKitchenSchema>) {
    try {
      const { data, error, status } = await supabase
        .from("kitchens")
        .insert([{ kitchenName: values.kitchenName, creator: user?.id }])
        .select();

      if (error && status !== 406) {
        throw error;
      }
      if(data){
        toast({
          title: "Kitchen created",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      form.reset()
      setIsDialogOpen(false)
      fetchKitchens()
    }
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
