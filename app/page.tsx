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
      <section className=" py-3 flex flex-col justify-center items-center">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#A7F0BA"
            d="M41.1,-72C54.8,-63.3,68.5,-55.4,74.7,-43.5C80.8,-31.7,79.4,-15.8,79.3,0C79.2,15.8,80.6,31.5,75,44.5C69.5,57.4,57.2,67.6,43.6,73.4C29.9,79.2,15,80.6,1.1,78.7C-12.7,76.7,-25.4,71.4,-38.8,65.4C-52.2,59.5,-66.2,52.9,-73.6,41.9C-81,30.9,-81.8,15.5,-79.7,1.2C-77.5,-13,-72.5,-26,-65.6,-37.8C-58.6,-49.6,-49.7,-60.1,-38.5,-70.2C-27.2,-80.3,-13.6,-90,0.1,-90.1C13.7,-90.1,27.4,-80.7,41.1,-72Z"
            transform="translate(100 100)"
          />
          <text
            x="35"
            fontFamily="cursive"
            fontSize={"12px"}
            y="80"
            fill="black"
          >
            {" "}
            Manage your ingridients
          </text>
          <text x="35" fontSize={"8px"} y="100" fill="black">
            Add and track your ingridients from
            <tspan x="35" y="110">
              your device.
            </tspan>
            <tspan x="35" y="120">
              Track price, quantity left, expiry date
            </tspan>
            <tspan x="35" y="130">
              and more
            </tspan>
          </text>
        </svg>
      </section>
      <section className=" py-3 flex flex-col justify-center items-center">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#E8DAFF"
            d="M41.3,-73C53.2,-64.6,62.3,-52.9,67.9,-40.2C73.5,-27.5,75.6,-13.7,77.7,1.2C79.7,16.1,81.7,32.2,75,43.2C68.4,54.2,53.2,60,39.3,64.7C25.4,69.3,12.7,72.7,-1.7,75.5C-16,78.4,-32,80.8,-43.5,74.7C-54.9,68.6,-61.8,54.2,-70.2,40.3C-78.6,26.4,-88.6,13.2,-89.7,-0.7C-90.8,-14.5,-83.2,-29.1,-74.9,-43.1C-66.6,-57.2,-57.7,-70.8,-45.1,-78.8C-32.5,-86.7,-16.2,-89,-0.8,-87.6C14.7,-86.3,29.4,-81.3,41.3,-73Z"
            transform="translate(100 100)"
          />
          <text
            x="35"
            fontFamily="cursive"
            fontSize={"12px"}
            y="80"
            fill="black"
          >
            Never forget a recipe
          </text>
          <text x="35" fontSize={"8px"} y="100" fill="black">
            Add and save all your favourite
            <tspan x="35" y="110">
              recipes in one place.
            </tspan>
            <tspan x="35" y="120">
              Quick to add and easy to refer.
            </tspan>
          </text>
        </svg>
      </section>
      <section className="py-3 flex flex-col justify-center items-center">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#BAE6FF"
            d="M62.4,-51C74.9,-34.2,74.8,-8.6,68.7,14.8C62.7,38.2,50.7,59.3,32.8,67.8C14.9,76.4,-8.9,72.2,-29.8,62.1C-50.6,52,-68.5,35.8,-74.9,15C-81.3,-5.8,-76.2,-31.3,-61.9,-48.5C-47.5,-65.8,-23.7,-74.8,0.6,-75.3C25,-75.8,50,-67.8,62.4,-51Z"
            transform="translate(100 100)"
          />
          <text
            x="46"
            fontFamily="cursive"
            fontSize={"12px"}
            y="80"
            fill="black"
          >
            Easy shopping list
          </text>
          <text x="35" fontSize={"8px"} y="110" fill="black">
            Add / remove items to and from
            <tspan x="35" y="120">
              the shopping list easily.
            </tspan>
          </text>
        </svg>
      </section>
      <section className=" py-3 flex flex-col justify-center items-center">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#FFD6E8"
            d="M42.2,-71.1C55.3,-65.5,66.9,-55.4,74.7,-42.8C82.5,-30.3,86.3,-15.1,86.3,0C86.3,15.1,82.3,30.2,74.8,43.3C67.4,56.4,56.4,67.5,43.3,74.9C30.2,82.3,15.1,86,0.1,85.8C-14.9,85.6,-29.8,81.5,-43.9,74.7C-58.1,67.9,-71.5,58.5,-80.4,45.6C-89.4,32.7,-93.8,16.3,-92,1C-90.3,-14.3,-82.4,-28.7,-73.3,-41.3C-64.3,-54,-54.1,-65.1,-41.7,-71.1C-29.3,-77.2,-14.6,-78.2,-0.1,-78.1C14.5,-78,29.1,-76.8,42.2,-71.1Z"
            transform="translate(100 100)"
          />
          <text
            x="35"
            fontFamily="cursive"
            fontSize={"12px"}
            y="80"
            fill="black"
          >
            Collaborate with family
            <tspan
              x="35"
              fontFamily="cursive"
              fontSize={"12px"}
              y="90"
              fill="black"
            >
              or friends
            </tspan>
          </text>
          <text x="35" fontSize={"8px"} y="110" fill="black">
            Add memebrs tpo your kitchen to
            <tspan x="35" y="120">
              collaborate with stock management
            </tspan>
          </text>
        </svg>
      </section>

      <section className="flex flex-col justify-center items-center">
        <Link href={"/auth"}>
          <Button className="py-5 my-5">Lets get started</Button>
        </Link>
      </section>
    </div>
  );
}
