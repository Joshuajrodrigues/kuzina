"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
//@ts-ignore
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  addToPantry,
  getPantryList,
  pantryItemSchema,
  updatePantryItem,
} from "@/services/PantryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import * as z from "zod";
import { Pantry } from "@/types/pantry";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const AddRecipesForm = ({
  closeDrawer,
  prefillData,
  isEditClicked,
  apiToMutate,
}: {
  closeDrawer: () => void;
  prefillData?: Pantry | null | undefined;
  isEditClicked?: boolean;
  apiToMutate?: string;
}) => {
  const { mutate } = useSWRConfig();
  const kitchenId = useParams().slug;
  const { toast } = useToast();

  const [isReadOnly, setIsReadOnly] = useState(true);

  const prefiledExpiryDate = prefillData?.expiry_date
    ? new Date(prefillData?.expiry_date)
    : undefined;

  const form = useForm<z.infer<typeof pantryItemSchema>>({
    resolver: zodResolver(pantryItemSchema),
    defaultValues: {
      item_name: prefillData?.item_name || "",
      quantity: prefillData?.quantity || 1,
      unit: prefillData?.unit || "num",
      price: prefillData?.price || 0,
      expiry_date: prefiledExpiryDate || undefined,
      description: prefillData?.description || "",
    },
  });

  async function onSubmit(values: z.infer<typeof pantryItemSchema>) {
    console.log("values", values);
    if (!!prefillData && !isEditClicked) {
      closeDrawer();
      return;
    }
    try {
      let request = Object.assign(values);
      request.id = prefillData?.id;

      if (prefillData) {
        const { data, error } = await updatePantryItem(
          prefillData.id,
          kitchenId as string,
          request
        );
        if (error) throw error;
        if (data) {
          toast({
            title: "Item updated",
            duration: 2000,
            className: " bg-green-500",
          });
          mutate([apiToMutate, kitchenId, 0, ""]);

          closeDrawer();
        }
      } else {
        const { data, error } = await addToPantry(
          "[pantry]-add",
          values,
          kitchenId as string
        );

        if (error) throw error;
        if (data) {
          toast({
            title: "Item added",
            duration: 2000,
          });
          try {
            mutate([apiToMutate, kitchenId, 0, ""]);
          } catch (error) {
            console.log(error);
          }

          closeDrawer();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 text-left"
      >
        <FormField
          control={form.control}
          name="item_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  readOnly={!!prefillData ? !isEditClicked : false}
                  placeholder="eg) Chiken tikka masala"
                  {...field}
                />
              </FormControl>
              <FormDescription>What should we call this recipe ?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

     
        <Button disabled type="submit">
          {!!prefillData && !isEditClicked ? "Close" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AddRecipesForm;
