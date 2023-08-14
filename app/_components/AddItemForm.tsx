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
} from "@/services/PantryService";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import * as z from "zod";
import { IPantryList } from "@/types/pantry";

const AddItemForm = ({ closeDrawer,prefillData }: { closeDrawer: () => void,prefillData?:IPantryList |null|undefined}) => {
  const { mutate, cache } = useSWRConfig();
  const kitchenId = useParams().slug;

  const form = useForm<z.infer<typeof pantryItemSchema>>({
    resolver: zodResolver(pantryItemSchema),
    defaultValues: {
      itemName: prefillData?.item_name||"",
      quantity: parseInt(prefillData?.quantity||'1')|| 1,
      unit: prefillData?.unit||"num",
      price:parseInt(prefillData?.price||'0')|| 0,
    },
  });

  async function onSubmit(values: z.infer<typeof pantryItemSchema>) {
    try {
      const { data, error } = await addToPantry(
        "[pantry]-add",
        values,
        kitchenId
      );

      if (error) throw error;
      if (data) {
        console.log("i ran");
        try {
          mutate(["[pantry]-list", kitchenId, 0]);
        } catch (error) {
          console.log(error);
        }

        closeDrawer();
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
          name="itemName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input  placeholder="eg) Pepper" {...field} />
              </FormControl>
              <FormDescription>What should we call this item ?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input min={0} type="number" placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                How much did this item cost you ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-5">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    className=" w-full"
                    min={0}
                    type="number"
                    placeholder="eg) 50"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Amount of the ingridient you have
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <FormControl defaultValue={"num"}>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="num">Number/s</SelectItem>
                      <SelectItem value="g">Grams</SelectItem>
                      <SelectItem value="kg">Kilograms</SelectItem>
                      <SelectItem value="l">Liter</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormDescription>Unit of the amount you have</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expiries on</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {field.value ? (
                      format(field.value, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                  <Select
                    onValueChange={(value) =>
                      field.onChange(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      //@ts-ignore
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <FormDescription>
                Whats the expiry date on your item?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddItemForm;
