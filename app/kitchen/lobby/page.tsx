
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import KitchenListing from "./KitchenListing";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic"
const page = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
 

 

  return (
    <div className="m-5 p-5">
      <h3 className=" text-xl">Welcome </h3>
      <h2 className=" text-l my-5">Your current kitchen is </h2>
      <KitchenListing session={session} />
    </div>
  );
};

export default page;
