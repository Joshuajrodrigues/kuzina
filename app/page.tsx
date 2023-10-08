import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import hero from "@/public/h2.svg";
import LandingPageCards from "./_components/LandingPageCards";

export default function Home() {
  //redirect('/pantry')
  return (
    <>
 
    <main className="p-5 m-5 lg:p-12 lg:m-12  ">
      <section className="flex flex-col justify-center items-center">
        <h1 className="text-4xl text-center">Your home kitchen management</h1>
      </section>

      <section className="flex flex-col justify-center items-center">
        <Image
          alt="Hero"
          src={hero}
          //placeholder="blur"
          priority={true}
         // placeholder="blur"
         // quality={100}
         // width={400}
         // height={400}
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
      <section className="py-3 text-xl lg:w-full lg:flex lg:items-center lg:justify-center text-center">
        <p>
          Are you tired of the chaos in your kitchen? <br /> Do you struggle
          with meal planning, grocery shopping, keeping track of your recipes,
          and finding it difficult to collaborate with family members on your
          culinary endeavors? <br /> <b >Look no further!</b>
        </p>
      </section>
      <section className=" lg:flex lg:flex-wrap">
        <section className="py-3 lg:w-1/2">
          <LandingPageCards
            title={"Manage your ingridients"}
            content={
              <p>
                Say goodbye to cluttered kitchen cabinets and pantries! With our
                ingredients management feature, you can effortlessly keep track
                of your kitchen essentials. Easily add, remove, and organize
                your ingredients to ensure you're always well-stocked for your
                culinary adventures.
              </p>
            }
          />
        </section>
        <section className=" py-3 lg:w-1/2">
          <LandingPageCards
            title={"Organize Your Recipes"}
            content={
              <p>
                Never lose a favorite recipe again! Our app lets you create a
                digital recipe book where you can store and organize all your
                culinary treasures.
              </p>
            }
          />
        </section>
        <section className="py-3 lg:w-1/2">
          <LandingPageCards
            title={"Create Smart Shopping Lists"}
            content={
              <p>
                Planning your grocery trips has never been easier!. Easily add
                items, check them off as you shop, and even share your lists
                with family members to streamline the shopping experience.
              </p>
            }
          />
        </section>
        <section className=" py-3 lg:w-1/2">
          <LandingPageCards
            title={"Collaborate with Ease"}
            content={
              <p>
                Cooking is better together! Our collaboration feature allows you
                to work seamlessly with family members or cooking buddies. Plan
                meals collectively, share recipes, and update shopping lists.
                Say goodbye to confusion and hello to harmonious meal
                preparation!
              </p>
            }
          />
        </section>
      </section>

      <section className="flex flex-col justify-center items-center">
        <Link href={"/auth"}>
          <Button className="py-5 my-5">Lets get started</Button>
        </Link>
      </section>
    </main>
    <footer className="flex items-center justify-center">
        <p>&copy; 2023 Kuzina. All rights reserved.</p>
      </footer>
    </>
  );
}
