import { serverSupabase } from "@/lib/constants";
import { cookies } from "next/headers";
import KitchenListing from "./KitchenListing";
import Image from "next/image";
export const dynamic = "force-dynamic";
import welcome from "@/public/welcome.svg";
const page = async () => {
  const supabase = serverSupabase(cookies);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="m-5 p-5 ">
      <h3 className=" text-xl md:text-3xl text-center w-full text-primary font-extrabold ">Welcome </h3>
      <div className="flex flex-col">
       
        <KitchenListing session={session} />
      </div>
    </div>
  );
};

export default page;
