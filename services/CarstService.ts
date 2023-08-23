import { clientSupabase } from "@/lib/constants";
import { Pantry } from "@/types/pantry";
import { PostgrestError } from "@supabase/supabase-js";

export const getCartItem = async (
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
      .eq("addedToCart", true)
      .eq("id", id);
    //.update({ other_column: "otherValue" })
    return { data: data?.[0], error };
  };