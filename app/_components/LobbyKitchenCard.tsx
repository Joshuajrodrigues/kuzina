"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Database } from "@/types/supabase";
import { TrashIcon } from "@radix-ui/react-icons";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { format, parseISO } from "date-fns";
import { useEffect, useState } from "react";

interface ILobbyKitchenCard {
  created_at: string | null;
  creator: string | null;
  id: string;
  kitchenName: string | null;
}

export type stateOfLobby = ILobbyKitchenCard[];

const LobbyKitchenCard = ({dataSource, session,daleteKitchen }: { dataSource:stateOfLobby,session: Session | null,daleteKitchen:(id:string)=>void }) => {
 
 


  return dataSource && dataSource?.length > 0
    ? dataSource?.map((item) => (
        <Card className="h-24 cursor-pointer flex justify-between items-center p-5 my-5 focus:border-double">
          <div className="flex flex-col justify-start">
            <span>Name : {item.kitchenName}</span>
            <section className="flex justify-between items-center">
              <span>
                Created On : {format(parseISO(item.created_at as string), "PP")}
              </span>
            </section>
          </div>

          <Button
            onClick={()=>daleteKitchen(item.id)}
            className=" text-red-500 borde"
            variant={"ghost"}
          >
            <TrashIcon />
          </Button>
        </Card>
      ))
    : "You are currently not part of any kitchen :(";
};

export default LobbyKitchenCard;
