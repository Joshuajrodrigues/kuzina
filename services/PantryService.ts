import { clientSupabase } from "@/lib/constants";
import { extractTableName } from "@/lib/utils";
import { Pantry } from "@/types/pantry";
import { PostgrestError } from "@supabase/supabase-js";
import { z } from "zod";
//-------------------------------------------------------------------------
export const pantryItemSchema = z.object({
  item_name: z.string().min(2).max(50),
  price: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.number().min(0).optional()
  ),
  quantity: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ required_error: "Quantity is required" })
      .min(1)
      .positive("Quantity must be positive")
  ),
  unit: z.string().min(1),
  expiry_date: z.date({ invalid_type_error: "Invalid date" }).optional(),
  description:z.string().optional()
});

//--------------------------------------------------------------------------

export const getPantryList = async (
  url: string,
  kitchenid: string,
  page: number
) => {
  let rangeEnd = page + 4;
  let tableName = extractTableName(url) || "";
  let { data, count, error } = await clientSupabase
    .from(tableName)
    .select("*", { count: "exact" })

    // Filters
    .eq("belongs_to", kitchenid)
    .order("created_at", { ascending: false })
    .range(page, rangeEnd);
  if (error) throw error;
  console.log("count", count);

  return { data, count };
};

export const addToPantry = async (
  url: string,
  values: z.infer<typeof pantryItemSchema>,
  kitchenId: string
): Promise<{
  data: any[] | null;
  error: PostgrestError | null;
}> => {
  let tableName = extractTableName(url) || "";
  const { data, error } = await clientSupabase
    .from(tableName)
    .insert([
      {
        item_name: values.item_name,
        quantity: values.quantity,
        belongs_to: kitchenId,
        expiry_date: values.expiry_date,
        price: values.price,
        unit: values.unit,
      },
    ])
    .select();

  return { data, error };
};

export const deletePantryItem = async (
  id: string,
  kitchenId: string
): Promise<{
  error: PostgrestError | null;
}> => {
  const { error } = await clientSupabase
    .from("pantry")
    .delete()
    .eq("belongs_to", kitchenId)
    .eq("id", id);

  return {error};
};

export const getPantryItem = async (
  id: string,
  kitchenId: string
): Promise<{
  data: Pantry | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await clientSupabase
    .from("pantry")
    .select("*")
    .eq("belongs_to", kitchenId)
    .eq("id", id);
  //.update({ other_column: "otherValue" })
  return { data: data?.[0], error };
};

export const updatePantryItem = async (
  id: string,
  kitchenId: string,
  updateObject: Pantry
): Promise<{
  data: Pantry | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await clientSupabase
    .from("pantry")
    .update(updateObject!)
    .eq("belongs_to", kitchenId)
    .eq("id", id)
    .select();
  return { data: data?.[0], error };
};
