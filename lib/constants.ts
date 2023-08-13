import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:3000/";

export const clientSupabase = createClientComponentClient<Database>();

export const filterOptions = [
  {
    label: "Running low",
  },
  {
    label: "Expiring soon",
  },
  {
    label: "Wishlisted",
  },
];
export const sortOptions = [
  {
    label: "Ascending",
  },
  {
    label: "Descending",
  },
];
