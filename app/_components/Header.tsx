import { cookies } from "next/headers";
import Link from "next/link";
import UserNav from "./UserNav";

import { serverSupabase } from "@/lib/constants";
import { EnvelopeClosedIcon, HeartFilledIcon } from "@radix-ui/react-icons";
import Notifications from "./Notifications";
import { ModeToggle } from "./ThemeToggle";
import { NextFont } from "next/dist/compiled/@next/font";
import logo from '@/public/vercel.svg'
import Image from "next/image";
export const Header = async ({font}:{font:NextFont}) => {
  const {
    data: { session },
  } = await serverSupabase(cookies).auth.getSession();

  return (
    <header className="mx-5 mb-5 p-5 flex justify-between items-center">
      <Link href={"/"}>
        <h1 className={`text-2xl ${font.className} flex md:text-4xl header-title`}><Image src={logo} alt="logo"   /> Kuzina</h1> <em className=" text-xs text-primary">/kuˈd͡zi.ɲa</em>
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
