import { clientSupabase } from "@/lib/constants";
import { extractTableName } from "@/lib/utils";
import { z } from "zod";


export const pantryItemSchema = z.object({
  itemName: z.string().min(2).max(50),
  price: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce.number().min(0).positive("Price must be positive").optional()
  ),
  quantity: z.preprocess(
    (args) => (args === "" ? undefined : args),
    z.coerce
      .number({ required_error: "Quantity is required" })
      .min(1)
      .positive("Quantity must be positive")
  ),
  unit: z.string().min(1),
  expiryDate: z.date({ invalid_type_error: "Invalid date" }).optional(),
});


export const getPantryList = async (
  url: string,
  kitchenid: string,
  page: number
) => {

  let rangeEnd = page + 5;
  let tableName = extractTableName(url) || ""
  let { data, error } = await clientSupabase
    .from(tableName)
    .select("*")

    // Filters
    .eq("belongs_to", kitchenid)
    .order('created_at', { ascending: false })
    .range(page, rangeEnd);
  if (error) throw error;
  return data;
};

export const addToPantry= async(url:string,values:z.infer<typeof pantryItemSchema>,kitchenId:string)=>{
  let tableName = extractTableName(url) || ""
  const { data, error } = await clientSupabase
  .from(tableName)
  .insert([
    {
      item_name: values.itemName,
      quantity: values.quantity,
      belongs_to: kitchenId,
      expiry_date: values.expiryDate,
      price: values.price,
      unit: values.unit,
    },
  ])
  .select();
}