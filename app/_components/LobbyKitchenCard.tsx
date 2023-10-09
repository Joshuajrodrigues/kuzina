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
    <div className="w-full flex items-start justify-center" key={item.id}>
      <Card
        key={item.id}
        className="h-20 w-full cursor-pointer flex justify-between items-center p-5 my-2 focus:border-double md:w-[340px]"
      >
        <Link className="flex flex-col justify-start w-full"  href={`/kitchen/${item.id}`}>
          <span>Name : {item.kitchenname}</span>
          <section className="flex justify-between items-center">
            <span className=" text-xs">
              Created on : {format(parseISO(item.created_at as string), "PP")}
            </span>
          </section>
        </Link>
        {item?.creator === user?.id && (
          <div
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                daleteKitchen(item.id);
              }}
              variant={"destructive"}
            >
              <TrashIcon />
              
            </Button>
          </div>
        )}
      </Card>
    </div>
  ));
};

export default LobbyKitchenCard;
