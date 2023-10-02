import { clientSupabase } from "@/lib/constants";
import { extractTableName } from "@/lib/utils";
import { Pantry } from "@/types/pantry";
import { PostgrestError, PostgrestSingleResponse } from "@supabase/supabase-js";
import { z } from "zod";
//-------------------------------------------------------------------------
export const RecipesSchema = z.object({
  recipeName: z.string().min(2, { message: "This field is required" }).max(50),
  ingridients: z
    .array(
      z
        .object({
          value: z.string().min(1, { message: "This field is required" }),
        })
        .required()
    )
    .min(1),
  steps: z
    .array(
      z
        .object({
          value: z.string().min(1, { message: "This field is required" }),
        })
        .required()
    )
    .min(1),
  note: z.string().max(200).optional(),
});
//------------------------------------------------------------------------------
type Recipe = {
  id: string;
  created_at: string;
  recipie_name: string;
  note: string;
};

export const addToRecipe = async (
  url: string,
  values: z.infer<typeof RecipesSchema>,
  kitchenId: string
): Promise<{
  data: Recipe[] | null;
  error: PostgrestError | null;
}> => {
  let tableName = extractTableName(url) || "";
  const { data, error } = await clientSupabase
    .from(tableName)
    .insert([
      {
        recipie_name: values.recipeName,
        belongs_to_kitchen: kitchenId,
        note: values.note,
      },
    ])
    .select();

  const typedData: Recipe[] = data as Recipe[];
  console.log("typedData",typedData);
  
  await addToIngridient(typedData[0].id,values)
  await addToSteps(typedData[0].id,values)
  return { data, error };
};


export const addToIngridient = async (
  recipeId: string,
  values: z.infer<typeof RecipesSchema>
): Promise<{
  data: any[] | null;
  error: PostgrestError | null;
}> => {
  let ingridients = values.ingridients.map((item) => item.value);
  const { data, error } = await clientSupabase
    .from("ingridients")
    .insert([
      {
        value: ingridients,
        belongs_to_recipe: recipeId,
      },
    ])
    .select();

  return { data, error };
};

export const addToSteps = async (
  recipeId: string,
  values: z.infer<typeof RecipesSchema>
): Promise<{
  data: any[] | null;
  error: PostgrestError | null;
}> => {
  let steps = values.steps.map((item) => item.value);
  const { data, error } = await clientSupabase
    .from("steps")
    .insert([
      {
        value: steps,
        belongs_to_recipe: recipeId,
      },
    ])
    .select();

  return { data, error };
};
