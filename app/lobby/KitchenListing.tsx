"use client";

import { LobbyKitchenCardCollection } from "@/app/_components/LobbyKitchenCard";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import CreateKitchenForm from "@/app/_components/CreateKitchenForm";
import LobbyKitchenCard from "@/app/_components/LobbyKitchenCard";
import { clientSupabase } from "@/lib/constants";
import useSWR from "swr";
import JoinKitchen from "../_components/JoinKitchen";
import { useToast } from "@/components/ui/use-toast";

const KitchenListing = ({ session }: { session: Session | null }) => {
  const [dataSource, setDataSource] = useState<LobbyKitchenCardCollection>([]);
  const user = session?.user;
  const { toast } = useToast();
  const { error, isLoading } = useSWR(
    ["kitchens"],
    ([url]) => fetchKitchens(),
    {
      revalidateOnFocus: false,
    }
  );

  const removeFromPermissions=async(id:string)=>{
    try {
      const { error } = await clientSupabase
        .from("kitchen_owners")
        .delete()
        .eq("kitchen", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }
  const daleteKitchen = async (id: string) => {
    const kitchenToDelete = dataSource.find((kitchen) => kitchen.id === id);
    console.log("kitchenToDelete",kitchenToDelete);
    
    if (kitchenToDelete?.creator === user?.id) {
      try {
        const { error } = await clientSupabase
          .from("pantry")
          .delete()
          .eq("belongs_to", id);

        if (error) {
          throw error;
        }
      } catch (error) {
        console.log(error);
      } finally {
        try {

          await removeFromPermissions(id)

          const { error } = await clientSupabase
            .from("kitchens")
            .delete()
            .eq("id", id);
          if (error) {
            throw error;
          }
        } catch (error) {
          console.log(error);
        } finally {
          toast({
            title: "Kitchen deleted",
            duration: 2000,
            className: "bg-green-500",
          });
          fetchKitchens();
        }
      }
    } else {
      console.log("not admin");
      
    }
  };
  const fetchKitchens = async () => {
    try {
      const { data, error } = await clientSupabase.rpc("get_owner_kitchens",{"kitchen_owner_id":user?.id!})
      if (error) {
        throw error;
      }
      if (data) {
        //@ts-ignore
        setDataSource(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchKitchens();
  // }, []);
  return (
    <div>
      <div className=" h-80 p-2 overflow-y-auto flex flex-col items-center ">
        <LobbyKitchenCard
          daleteKitchen={daleteKitchen}
          dataSource={dataSource!}
          isLoading={isLoading}
          user={user}
        />
      </div>
      <section className="flex flex-col my-2 text-white justify-center items-center"> 
      {
        dataSource.length ===0 &&
        <CreateKitchenForm fetchKitchens={fetchKitchens} session={session} />
      }

        <JoinKitchen fetchKitchens={fetchKitchens} session={session} />
      </section>
    </div>
  );
};

export default KitchenListing;
