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
import {
  CalendarIcon,
  MinusCircledIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import * as z from "zod";
import { Pantry } from "@/types/pantry";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { RecipesSchema } from "@/services/RecipesService";

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
  const [ingridientsCount, setIngridientsCount] = useState(5);
  const [isReadOnly, setIsReadOnly] = useState(true);

  const prefiledExpiryDate = prefillData?.expiry_date
    ? new Date(prefillData?.expiry_date)
    : undefined;

  const form = useForm<z.infer<typeof RecipesSchema>>({
    resolver: zodResolver(pantryItemSchema),
    defaultValues: {
      recipeName: prefillData?.item_name || "",
      ingridients: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
      steps: [{ value: "" }, { value: "" }, { value: "" }, { value: "" }],
    },
  });
  const { fields:ingridientsFields, append:ingridientsAppend, remove:ingridientsRemove } = useFieldArray({
    name: "ingridients",
    control: form.control,
  });
  const { fields:stepsFields, append:stepsAppend, remove:stepsRemove } = useFieldArray({
    name: "steps",
    control: form.control,
  });
  async function onSubmit(values: z.infer<typeof RecipesSchema>) {
    // console.log("values", values);
    // if (!!prefillData && !isEditClicked) {
    //   closeDrawer();
    //   return;
    // }
    // try {
    //   let request = Object.assign(values);
    //   request.id = prefillData?.id;
    //   if (prefillData) {
    //     const { data, error } = await updatePantryItem(
    //       prefillData.id,
    //       kitchenId as string,
    //       request
    //     );
    //     if (error) throw error;
    //     if (data) {
    //       toast({
    //         title: "Item updated",
    //         duration: 2000,
    //         className: " bg-green-500",
    //       });
    //       mutate([apiToMutate, kitchenId, 0, ""]);
    //       closeDrawer();
    //     }
    //   } else {
    //     const { data, error } = await addToPantry(
    //       "[pantry]-add",
    //       values,
    //       kitchenId as string
    //     );
    //     if (error) throw error;
    //     if (data) {
    //       toast({
    //         title: "Item added",
    //         duration: 2000,
    //       });
    //       try {
    //         mutate([apiToMutate, kitchenId, 0, ""]);
    //       } catch (error) {
    //         console.log(error);
    //       }
    //       closeDrawer();
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 text-left"
      >
        <FormField
          control={form.control}
          name="recipeName"
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
              <FormDescription>
                What should we call this recipe ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {ingridientsFields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`ingridients.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Ingridients
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add ingridients to your recipe.
                  </FormDescription>
                  <div className="flex justify-evenly">
                  <FormControl>
                    <Input
                      className=" w-80"
                      readOnly={!!prefillData ? !isEditClicked : false}
                      placeholder={`Enter ingridient ${index+1}`}
                      {...field}
                    />
                  </FormControl>
                  <Button onClick={()=>ingridientsRemove(index)} variant={"destructive"} size={"icon"}>
                    <MinusCircledIcon />
                  </Button>

                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            className="my-2"
            onClick={() => ingridientsAppend({ value: "" })}
            variant={"secondary"}
          >
            <PlusCircledIcon className="mr-2" /> Add more
          </Button>
        </div>
        <div>
          {stepsFields.map((field, index) => (
            <FormField
              key={field.id}
              control={form.control}
              name={`steps.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Steps
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add steps to your recipe.
                  </FormDescription>
                  <div className="flex justify-evenly">
                  <FormControl>
                    <Input
                      className=" w-80"
                      readOnly={!!prefillData ? !isEditClicked : false}
                      placeholder={`Enter step ${index+1}`}
                      {...field}
                    />
                  </FormControl>
                  <Button onClick={()=>stepsRemove(index)} variant={"destructive"} size={"icon"}>
                    <MinusCircledIcon />
                  </Button>

                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            className="my-2"
            onClick={() => stepsAppend({ value: "" })}
            variant={"secondary"}
          >
            <PlusCircledIcon className="mr-2" /> Add more
          </Button>
        </div>
        <Button disabled type="submit">
          {!!prefillData && !isEditClicked ? "Close" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AddRecipesForm;
