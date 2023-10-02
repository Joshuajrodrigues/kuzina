import { clientSupabase } from "@/lib/constants";
import { extractTableName } from "@/lib/utils";
import { Pantry } from "@/types/pantry";
import { PostgrestError } from "@supabase/supabase-js";
import { z } from "zod";
//-------------------------------------------------------------------------
export const RecipesSchema = z.object({
  recipeName: z.string().min(2,{message:"This field is required"}).max(50),
  ingridients:z.array(
    z.object({
      value:z.string().min(1,{message:"This field is required"})
    }).required()
  ).min(1),
  steps:z.array(
    z.object({
      value:z.string().min(1,{message:"This field is required"})
    }).required()
  ).min(1),
  note:z.string().max(200).optional()
});
