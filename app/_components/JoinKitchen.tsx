"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  kitchenId: z.string().min(2).max(100),
});

const JoinKitchen = ({
  session,
  fetchKitchens,
}: {
  session: Session | null;
  fetchKitchens: () => void;
}) => {
  const supabase = createClientComponentClient<Database>();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = session?.user;
  const form = useForm<z.infer<typeof addKitchenSchema>>({
    resolver: zodResolver(addKitchenSchema),
    defaultValues: {
      kitchenId: "",
    },
  });
  const checkIfAlreadyAMember = async (
    code: string
  ) => {
    try {
      const { data, error, status } = await supabase
        .from("kitchen_owners")
        .select("*", {
          count: "exact",
        })
        .eq("kitchen", code)
        .eq("owner", user?.id!);

      if (error && status !== 406) {
        throw error;
      }
      console.log("datadata",data);
      
      if (data&&data?.length>0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfAlreadyRequested = async (
    code: string
  ) => {
    try {
      const { data, error, status } = await supabase
        .from("requests")
        .select("*", {
          count: "exact",
        })
        .eq("request_to", code)
        .eq("request_from", user?.id!);

      if (error && status !== 406) {
        throw error;
      }
      if (data&&data?.length>0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  async function onSubmit(values: z.infer<typeof addKitchenSchema>) {
    let code = values.kitchenId.replace("Use invite code ","")
    setIsSubmitting(true);
    let isAMember = await checkIfAlreadyAMember(code);
    let isRequested = await checkIfAlreadyRequested(code);
    console.log("isAMember",isAMember);
    
    if (isAMember) {
      toast({
        title: "Already a member",
        duration: 2000,
        className: "bg-green-500",
      });
      setIsSubmitting(false);

      return;
    }
    if (isRequested) {
      toast({
        title: "Already requested",
        duration: 2000,
        className: "bg-green-500",
      });
      setIsSubmitting(false);

      return;
    }
  

    try {
      const { data, error, status } = await supabase
        .from("requests")
        .insert([{ request_from: user?.id!, request_to: code }])
        .select();

      if (error && status !== 406) {
        throw error;
      }
      if (data) {
        toast({
          title: "Request sent to kitchen owner",
          duration: 2000,
          className: "bg-green-500",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
      setIsDialogOpen(false);
      fetchKitchens();
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
      }}
    >
      <DialogTrigger className="my-5" asChild>
        <Button
          variant={"default"}
          type="button"
          className=" text-l text-secondary w-64"
        >
          Join an existing kitchen{" "}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join kitchen</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 text-left"
          >
            <FormField
              control={form.control}
              name="kitchenId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kitchen id</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Use invite code xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the kitchen id you wish to join.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isSubmitting} className="my-5" type="submit">
              Join
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinKitchen;
