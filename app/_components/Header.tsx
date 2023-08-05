import { Button } from "@/components/ui/button";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";
import { Database } from "../../types/supabase";



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
        {user && (
          <form action="api/auth/signout" method="post">
            <Button className="button block" type="submit">
              Sign out
            </Button>
          </form>
        )}
      </section>
    </header>
  );
};
