"use client";

import  {
  stateOfLobby,
} from "@/app/_components/LobbyKitchenCard";
import { Button } from "@/components/ui/button";
import { Database } from "@/types/supabase";
import { Session, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import CreateKitchenForm from "@/app/_components/CreateKitchenForm";
import LobbyKitchenCard from "@/app/_components/LobbyKitchenCard";

const KitchenListing = ({ session }: { session: Session | null }) => {
    const supabase = createClientComponentClient<Database>();
    const [dataSource, setDataSource] = useState<stateOfLobby>([]);
    const user = session?.user
    const daleteKitchen = async (id: string) => {
        try {
          const { error } = await supabase.from("kitchens").delete().eq("id", id);
    
          if (error) {
            throw error;
          }
        } catch (error) {
          console.log(error);
        } finally {
          fetchKitchens();
        }
      };
      const fetchKitchens = async () => {
        try {
          const { data, error } = await supabase
            .from("kitchens")
            .select(`*`)
            .eq("creator", user?.id);
          if (error) {
            throw error;
          }
          if (data) {
            setDataSource(data);
          }
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(()=>{
        fetchKitchens()
      },[])
  return (
    <>
      <div className="h-96 p-2 overflow-x-scroll">
        <LobbyKitchenCard
          daleteKitchen={daleteKitchen}
          dataSource={dataSource}
          session={session}
        />
      </div>
      <section className="flex flex-col my-5 text-white">
        <CreateKitchenForm fetchKitchens={fetchKitchens} session={session} />

        <Button
          disabled
          variant={"default"}
          type="button"
          className=" my-5 text-l"
        >
          Join an existing kitchen{" "}
        </Button>
      </section>
    </>
  );
};

export default KitchenListing;
