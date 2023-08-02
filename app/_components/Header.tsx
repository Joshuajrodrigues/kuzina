import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const Header = () => {
  return (
    <header className="mx-5 mb-5 p-5 flex justify-between">
      <Link href={'/'} >
      <h1 className="text-3xl text-black">KUZINA</h1>
      </Link>
      {/* <section className="flex">
        <Link href={'/signup'} className="mr-2 bg-primary text-sm p-2 text-white rounded-lg text-center flex items-center justify-center" >Sign up</Link>
        <Link href={'/signin'}  className="bg-primary text-sm p-2 text-white rounded-lg text-center flex items-center justify-center"  >Sign in</Link>
      </section> */}
    </header>
  );
};
