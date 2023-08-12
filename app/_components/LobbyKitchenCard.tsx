"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import Link from "next/link";

interface ILobbyKitchenCard {
  created_at: string | null;
  creator: string | null;
  id: string;
  kitchenName: string | null;
}

export type LobbyKitchenCardCollection = ILobbyKitchenCard[];

const LobbyKitchenCard = ({
  dataSource,
  daleteKitchen,
}: {
  dataSource: LobbyKitchenCardCollection;
  daleteKitchen: (id: string) => void;
}) => {
  if (dataSource?.length <= 0) {
    return <>You are currently not part of any kitchen :(</>;
  }

  return dataSource?.map((item) => (
    <Link key={item.id} href={`/kitchen/${item.id}`}>

    <Card
      key={item.id}
      className="h-24 cursor-pointer flex justify-between items-center p-5 my-5 focus:border-double"
    >
      <div className="flex flex-col justify-start">
        <span>Name : {item.kitchenName}</span>
        <section className="flex justify-between items-center">
          <span>
            Created On : {format(parseISO(item.created_at as string), "PP")}
          </span>
        </section>
      </div>

      {/* <Button
        onClick={() => daleteKitchen(item.id)}
        className=" text-red-500 borde"
        variant={"ghost"}
      >
        <TrashIcon />
      </Button> */}
    </Card>
    </Link>
  ));
};

export default LobbyKitchenCard;
