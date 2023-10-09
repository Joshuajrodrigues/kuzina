import { Database } from "@/types/supabase";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:3000/";

export const clientSupabase = createClientComponentClient<Database>();
export const serverSupabase = (cookies: () => ReadonlyRequestCookies) =>
  createServerComponentClient<Database>({ cookies });
export const filterOptions = [
  {
    label: "Running low",
  },
  {
    label: "Expiring soon",
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
export const recipeTypes = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Snack",
    value: "snack",
  },
  {
    label: "Main course",
    value: "mainCourse",
  },
  {
    label: "Soup",
    value: "soup",
  },
  {
    label: "Drink",
    value: "drink",
  },
  {
    label: "Pickle",
    value: "pickle",
  },
  {
    label: "Deasert",
    value: "deasert",
  },
];
