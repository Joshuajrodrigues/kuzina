import { cookies } from "next/headers";
import Link from "next/link";
import UserNav from "./UserNav";

import { serverSupabase } from "@/lib/constants";
import { EnvelopeClosedIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import Notifications from "./Notifications";
import { ModeToggle } from "./ThemeToggle";
import { NextFont } from "next/dist/compiled/@next/font";

export const Header = async ({font}:{font:NextFont}) => {
  const {
    data: { session },
  } = await serverSupabase(cookies).auth.getSession();

  return (
    <header className="mx-5 mb-5 p-5 flex justify-between">
      <Link href={"/"}>
        <h1 className={`text-3xl ${font.className} md:text-4xl`}>Cozinh</h1> <em className=" text-xs">/koˈd͡zi.ɲ</em>
      </Link>
      <section className="flex items-center justify-between md:w-36">
        {/* <UserProfileMenu/> */}
        <ModeToggle/>
        <Notifications session={session}/>
        <UserNav session={session} />
      </section>
    </header>
  );
};
