"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import LobbyListSkelleton from "./skelletons/LobbyListSkelleton";
import DeleteConfirm from "./DeleteConfirm";
import { useState } from "react";

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
  isLoading,
}: {
  dataSource: LobbyKitchenCardCollection;
  daleteKitchen: (id: string) => void;
  isLoading: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <LobbyListSkelleton />;
  }
  if (dataSource?.length <= 0) {
    return (
      <div className="h-24 w-full cursor-pointer flex justify-center items-center ">
        <span>You are currently not part of any kitchen :(</span>
      </div>
    );
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
        <div onClick={(e) => e.stopPropagation()}>
          <DeleteConfirm
            handleOpen={(value) => {
              setIsOpen(value);
            }}
            isOpen={isOpen}
            descp="This action cannot be undone and will parmanently delete your kitchen"
            handleDelete={() => {
              daleteKitchen(item.id);
              setIsOpen(false);
            }}
          />
        </div>
      </Card>
    </Link>
  ));
};

export default LobbyKitchenCard;
