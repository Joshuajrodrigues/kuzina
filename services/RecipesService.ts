import { clientSupabase } from "@/lib/constants";
import { extractTableName } from "@/lib/utils";
import { Pantry } from "@/types/pantry";
import { PostgrestError } from "@supabase/supabase-js";
import { z } from "zod";
//-------------------------------------------------------------------------
export const RecipesSchema = z.object({
  recipeName: z.string().min(2).max(50),
  ingridients:z.array(
    z.object({
      value:z.string()
    }).required()
  ),
  steps:z.array(
    z.object({
      value:z.string()
    }).required()
  )
});
