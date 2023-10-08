import Link from "next/link";
import React from "react";
import hero from "@/public/h1.svg";
import Image from "next/image";
import CopyToClipboard from "@/app/_components/CopyToClipboard";
import Help from "@/app/_components/Help";

const page = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <div className="mx-5 px-5 flex justify-between">
        <CopyToClipboard id={params.slug} />{" "}
        <Help description="Invite code to get your family to collaborate with you" />
      </div>
      <div className="m-5 px-5 flex flex-col items-center text-center">
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
    </>
  );
};

export default page;

const LinkButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      className="my-5 w-full bg-white border h-20 text-center flex items-center justify-center border-primary text-primary rounded-md py-3 px-6"
      href={href}
    >
      {text}
    </Link>
  );
};
