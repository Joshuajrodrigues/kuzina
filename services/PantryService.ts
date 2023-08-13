import { clientSupabase } from "@/lib/constants";
import { extractTableName } from "@/lib/utils";

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
