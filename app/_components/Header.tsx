import { cookies } from "next/headers";
import Link from "next/link";
import UserNav from "./UserNav";

import { serverSupabase } from "@/lib/constants";
import { EnvelopeClosedIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import Notifications from "./Notifications";

export const Header = async () => {
  const {
    data: { session },
  } = await serverSupabase(cookies).auth.getSession();

  return (
    <header className="mx-5 mb-5 p-5 flex justify-between">
      <Link href={"/"}>
        <h1 className="text-3xl text-black">KUZINA</h1>
      </Link>
      <section className="flex items-center justify-between">
        {/* <UserProfileMenu/> */}
        <Notifications session={session}/>
        <UserNav session={session} />
      </section>
    </header>
  );
};
