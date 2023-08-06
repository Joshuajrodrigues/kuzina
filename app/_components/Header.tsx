import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import { Database } from "../../types/supabase";
import UserProfileMenu from "./UserProfileMenu";



export const Header = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;
  return (
    <header className="mx-5 mb-5 p-5 flex justify-between">
      <Link href={"/"}>
        <h1 className="text-3xl text-black">KUZINA</h1>
      </Link>
      <section className="flex">
        <UserProfileMenu session={session} />
      </section>
    </header>
  );
};
