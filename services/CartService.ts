import { clientSupabase } from "@/lib/constants";
import { Pantry } from "@/types/pantry";
import { PostgrestError } from "@supabase/supabase-js";

export const getCartList = async (
    url:string,
    kitchenId: string,
    page: number,
  ) => {
    let rangeEnd = page + 4;
    const { data,count, error } = await clientSupabase
      .from("pantry")
      .select("*", { count: "exact" })
      .eq("belongs_to", kitchenId)
      .eq("addedToCart", true)
      .order("created_at", { ascending: false })
      .range(page, rangeEnd);
      
    //.update({ other_column: "otherValue" })
    return { data, count };
  };