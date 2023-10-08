
import { serverSupabase } from "@/lib/constants";
import { cookies } from "next/headers";
import KitchenListing from "./KitchenListing";
export const dynamic = "force-dynamic"
const page = async () => {
  const supabase = serverSupabase(cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();
 

 

  return (
    <div className="m-5 p-5 " >
      <h3 className=" text-xl md:text-3xl ">Welcome </h3>
      <KitchenListing session={session} />
    </div>
  );
};

export default page;
