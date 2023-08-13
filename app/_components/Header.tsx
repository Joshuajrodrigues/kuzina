import { cookies } from "next/headers";
import Link from "next/link";
import UserNav from "./UserNav";

import { serverSupabase } from "@/lib/constants";

export const Header = async () => {
  
  const {
    data: { session },
  } = await serverSupabase(cookies).auth.getSession();
 
  return (
    <header className="mx-5 mb-5 p-5 flex justify-between">
      <Link href={"/"}>
        <h1 className="text-3xl text-black">KUZINA</h1>
      </Link>
      <section className="flex">
        {/* <UserProfileMenu/> */}
        <UserNav  session={session} />
      </section>
    </header>
  );
};
