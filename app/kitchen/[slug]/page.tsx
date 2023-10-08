import Link from "next/link";
import React from "react";
import CopyToClipboard from "@/app/_components/CopyToClipboard";
import Help from "@/app/_components/Help";
import KitchenName from "@/app/_components/KitchenName";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import food from "@/public/food.svg";
const page = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <div className="mx-5 px-5 flex justify-between">
        <CopyToClipboard id={params.slug} />{" "}
        <Help description="Use code to invite members" />
      </div>
      <div className="m-5 px-5 flex flex-col items-center text-center lg:flex-row-reverse lg:justify-around lg:m-5">
        <div className="flex flex-col items-center text-center">
          <h3 className=" text-xl md:text-3xl text-left text-primary mb-10 font-extrabold ">
            <KitchenName id={params.slug} />
          </h3>

          <LinkButton
            href={`/kitchen/${params.slug}/pantry`}
            text="Pantry List"
          />
          <LinkButton
            href={`/kitchen/${params.slug}/recipies`}
            text="Recipie List"
          />
          <LinkButton
            href={`/kitchen/${params.slug}/shoppinglist`}
            text="Wish List"
          />
        </div>
        <Image className="mt-2  md:w-[600px]" src={food} alt="food" />
      </div>
    </>
  );
};

export default page;

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link className="" href={href}>
      <Card className="my-2 w-64 md:w-80  border h-20 font-bold text-center flex items-center justify-center text-primary py-3 px-6">
        {text}
      </Card>
    </Link>
  );
};
