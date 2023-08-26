"use client";

import { LobbyKitchenCardCollection } from "@/app/_components/LobbyKitchenCard";
import { Button } from "@/components/ui/button";
import { Session } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import CreateKitchenForm from "@/app/_components/CreateKitchenForm";
import LobbyKitchenCard from "@/app/_components/LobbyKitchenCard";
import { clientSupabase } from "@/lib/constants";
import useSWR from "swr";

const KitchenListing = ({ session }: { session: Session | null }) => {
  const [dataSource, setDataSource] = useState<LobbyKitchenCardCollection>([]);
  const user = session?.user;

  const { error, isLoading } = useSWR(
    ["kitchens"],
    ([url]) => fetchKitchens(),
    {
      revalidateOnFocus: false,
    }
  );

  const daleteKitchen = async (id: string) => {
    const kitchenToDelete = dataSource.find((kitchen) => kitchen.id === id);
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
          fetchKitchens();
        }
      }
    } else {
    }
  };
  const fetchKitchens = async () => {
    try {
      const { data, error } = await clientSupabase
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

  // useEffect(() => {
  //   fetchKitchens();
  // }, []);
  return (
    <>
      <div className="h-96 p-2 overflow-x-scroll">
        <LobbyKitchenCard
          daleteKitchen={daleteKitchen}
          dataSource={dataSource!}
          isLoading={isLoading}
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
