import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import hero from "@/public/h2.svg";

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
      <section className="  flex flex-col justify-center items-center">
        <Image
          alt="Hero"
          src={hero}
          //placeholder="blur"
          quality={100}
          width={200}
          height={200}
          style={{
            objectFit: "cover",
          }}
        />
        <a
          className="text-xs"
          href="https://www.freepik.com/free-vector/female-chef-concept-illustration_31197290.htm#query=kitchen&position=38&from_view=search&track=sph"
        >
          <small>Image by storyset on Freepik</small>
        </a>
      </section>
      <section className="flex flex-col justify-center items-center">
        <Link href={"/auth"}>
          <Button className="py-5 my-5">Lets get started</Button>
        </Link>
      </section>

      <section className=" py-5 my-5 flex flex-col ">
        <h2 className="text-xl">How does it work ?</h2>
        <p>
          Kuzina is a kitchen management app designed to keep track of all your
          kitchen inventory and your recipies. You create or join a kitchen on
          joining in. If you make your own kitchen you can invite memebers of
          your family to join your kitchen. Kuzina will notify you of what
          recipies are possible to be cooked by checking your inventory. It can
          also show you info on which items your running low on or are close to
          expiry date. If any item is missing on a recipe it lets you assign it
          to a shopping list. Which can be accessed by any memeber of your
          kitchen.
        </p>
        <p>
          Kuzina is designed to be incrementally adopted, so you can add items
          to it next time you go shopping or during your free time. The best way
          would be to start by adding your recipies and let kuzina import all
          the inventory required from there.
        </p>
        {/* <h2 className="text-xl">Pricing</h2> */}
      </section>
    </div>
  );
}
