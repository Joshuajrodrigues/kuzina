import { Button } from "@/components/ui/button";
import React from "react";

export const Header = () => {
  return (
    <header className="mx-5 mb-5 p-5 flex justify-between">
      <h1 className="text-3xl text-black">KUZINA</h1>
      <section className="flex">
        <Button className="mr-2" size={"sm"}>Sign up</Button>
        <Button size={"sm"}>Sign in</Button>
      </section>
    </header>
  );
};
