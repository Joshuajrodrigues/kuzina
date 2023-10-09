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
import { cn } from "@/lib/utils";

import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { MinusCircledIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import * as z from "zod";

import { Textarea } from "@/components/ui/textarea";
import { recipeTypes } from "@/lib/constants";
import {
  RecipeEdit,
  RecipesSchema,
  addToRecipe,
  updateRecipeItem,
} from "@/services/RecipesService";
import FastFill from "./FastFill";

const AddRecipesForm = ({
  closeDrawer,
  prefillData,
  isEditClicked,
  apiToMutate,
}: {
  closeDrawer: () => void;
  prefillData?: RecipeEdit;
  isEditClicked?: boolean;
  apiToMutate?: string;
}) => {
  const { mutate } = useSWRConfig();
  const kitchenId = useParams().slug;
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RecipesSchema>>({
    resolver: zodResolver(RecipesSchema),
    defaultValues: {
      recipeName: prefillData?.recipe?.recipie_name || "",
      ingridients: prefillData?.ingridients?.map((item) => {
        return { value: item };
      }) || [{ value: "" }, { value: "" }],
      steps: prefillData?.steps?.map((item) => {
        return { value: item };
      }) || [{ value: "" }, { value: "" }, { value: "" }],
      note: prefillData?.recipe?.note || "",
      type: prefillData?.recipe?.type || undefined,
    },
  });
  const {
    fields: ingridientsFields,
    append: ingridientsAppend,
    remove: ingridientsRemove,
  } = useFieldArray({
    name: "ingridients",
    control: form.control,
  });
  const {
    fields: stepsFields,
    append: stepsAppend,
    remove: stepsRemove,
  } = useFieldArray({
    name: "steps",
    control: form.control,
  });
  async function onSubmit(values: z.infer<typeof RecipesSchema>) {
    console.log("valuesvalues", values);

    if (!!prefillData && !isEditClicked) {
      closeDrawer();
      return;
    }
    try {
      let request = Object.assign(values);
      request.id = prefillData?.recipe?.id;

      console.log("request", request);
      let requestbody: RecipeEdit = {
        recipe: {
          id: request.id,
          recipie_name: request.recipeName,
          belongs_to_kitchen: kitchenId as string,
          note: request.note,
          type: request.type,
        },
        //@ts-ignore
        ingridients: request.ingridients.map((item) => item.value),
        //@ts-ignore
        steps: request.steps.map((item) => item.value),
      };
      if (prefillData) {
        const { data, error } = await updateRecipeItem(
          prefillData?.recipe.id,
          kitchenId as string,
          requestbody
        );
        if (error) throw error;
        if (data) {
          toast({
            title: "Recipe updated",
            duration: 2000,
            className: " bg-green-500",
          });
          mutate([apiToMutate, kitchenId, 0, "", "", ""]);
          closeDrawer();
        }
      } else {
        const { data, error } = await addToRecipe(
          "[recipies]-add",
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
            mutate([apiToMutate, kitchenId, 0, "", "", ""]);
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
          name="recipeName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className=" w-72 md:w-80"
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
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  disabled={!!prefillData ? !isEditClicked : false}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {recipeTypes
                      ?.filter((item) => item.value !== "all")
                      ?.map((item) => (
                        <SelectItem value={item.value}>{item.label}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>
                What should we group this recipe as ?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {(!prefillData || isEditClicked) && (
          <FastFill
            title="ingridients"
            handleAutoData={(text, isPreserve) => {
              let value = [];
              let newValues = text.map((item) => ({
                value: item,
              }));
              if (isPreserve) {
                const currentValues = form.getValues("ingridients");
                value = [...currentValues, ...newValues];
              } else {
                value = [...newValues];
              }
              if (text.length > 0) {
                form.setValue("ingridients", value);
              }
            }}
          />
        )}
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
                  <div className="flex justify-start">
                    <FormControl>
                      <Input
                        className=" w-80 mr-5"
                        readOnly={!!prefillData ? !isEditClicked : false}
                        placeholder={`Enter ingridient ${index + 1}`}
                        {...field}
                      />
                    </FormControl>
                    {(!prefillData || isEditClicked) && (
                      <Button
                        type="button"
                        tabIndex={-1}
                        onClick={() => ingridientsRemove(index)}
                        variant={index > 0 ? "destructive" : "ghost"}
                        size={"icon"}
                        disabled={index <= 0}
                      >
                        {index > 0 && <MinusCircledIcon />}
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {(!prefillData || isEditClicked) && (
            <Button
              type="button"
              className="my-2"
              onClick={() => ingridientsAppend({ value: "" })}
              variant={"secondary"}
            >
              <PlusCircledIcon className="mr-2" /> Add more
            </Button>
          )}
        </div>
        {(!prefillData || isEditClicked) && (
          <FastFill
            title="steps"
            handleAutoData={(text, isPreserve) => {
              let value = [];
              let newValues = text.map((item) => ({
                value: item,
              }));
              if (isPreserve) {
                const currentValues = form.getValues("steps");
                value = [...currentValues, ...newValues];
              } else {
                value = [...newValues];
              }
              if (text.length > 0) {
                form.setValue("steps", value);
              }
            }}
          />
        )}
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
                  <div className="flex justify-start">
                    <FormControl>
                      <Textarea
                        className=" w-80 mr-5"
                        readOnly={!!prefillData ? !isEditClicked : false}
                        placeholder={`Enter step ${index + 1}`}
                        {...field}
                      />
                    </FormControl>
                    {(!prefillData || isEditClicked) && (
                      <Button
                        type="button"
                        tabIndex={-1}
                        onClick={() => stepsRemove(index)}
                        variant={index > 0 ? "destructive" : "ghost"}
                        size={"icon"}
                        disabled={index <= 0}
                      >
                        {index > 0 && <MinusCircledIcon />}
                      </Button>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {(!prefillData || isEditClicked) && (
            <Button
              type="button"
              className="my-2"
              onClick={() => stepsAppend({ value: "" })}
              variant={"secondary"}
            >
              <PlusCircledIcon className="mr-2" /> Add more
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  className="w-72 md:w-80"
                  readOnly={!!prefillData ? !isEditClicked : false}
                  maxLength={200}
                  {...field}
                />
              </FormControl>
              <FormDescription>Additional info perhaps ?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {!!prefillData && !isEditClicked ? "Close" : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default AddRecipesForm;
