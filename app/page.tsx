import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  //redirect('/pantry')
  return (
    <div className="p-5 m-5  ">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center">Your home kitchen management</h1>
      </section>

      <section className=" py-5 my-5 flex flex-col justify-center items-center">
        <h2>Manage your ingridients</h2>
        <h2>Manage your recipies</h2>
        <h2>Collaboarate with family members</h2>
      </section>

      <section className="flex flex-col justify-center items-center">
        <Link href={'/auth'}>
        <Button  className="py-5 my-5">Lets get started</Button>
        </Link>
      </section>

      <section className=" py-5 my-5 flex flex-col ">
        <h2 className="text-xl">How does it work ?</h2>
        <h2 className="text-xl">Pricing</h2>
      </section>
    </div>
  );
}
