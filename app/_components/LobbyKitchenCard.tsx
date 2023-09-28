"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrashIcon } from "@radix-ui/react-icons";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import LobbyListSkelleton from "./skelletons/LobbyListSkelleton";
import DeleteConfirm from "./DeleteConfirm";
import { useState } from "react";
import Empty from "./Empty";
import { User } from "@supabase/supabase-js";

interface ILobbyKitchenCard {
  id: string;
  created_at: string | null;
  kitchenname: string | null;
  creator: string | null;
  owner: string | null;
  kitchen: string;
}

export type LobbyKitchenCardCollection = ILobbyKitchenCard[];

const LobbyKitchenCard = ({
  dataSource,
  daleteKitchen,
  isLoading,
  user,
}: {
  dataSource: LobbyKitchenCardCollection;
  daleteKitchen: (id: string) => void;
  isLoading: boolean;
  user?: User;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setIsItemToDelete] = useState("");
  if (isLoading) {
    return <LobbyListSkelleton />;
  }
  if (dataSource?.length <= 0) {
    return (
      <div className="h-24 w-full cursor-pointer flex justify-center items-center ">
        <Empty message="You are not part of any kitchens" />
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
          <span>Name : {item.kitchenname}</span>
          <section className="flex justify-between items-center">
            <span className=" text-xs">
              Created on : {format(parseISO(item.created_at as string), "PP")}
            </span>
          </section>
        </div>
        {item?.creator === user?.id && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setIsItemToDelete(item.id);
            }}
          >
            <DeleteConfirm
              handleOpen={(value) => {
                setIsOpen(value);
              }}
              showLabel={false}
              isOpen={isOpen}
              descp="This action cannot be undone and will parmanently delete your kitchen"
              handleDelete={() => {
                daleteKitchen(itemToDelete);
                setIsOpen(false);
              }}
            />
          </div>
        )}
      </Card>
    </Link>
  ));
};

export default LobbyKitchenCard;
