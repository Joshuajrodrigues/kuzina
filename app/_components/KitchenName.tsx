"use client";

import { clientSupabase } from "@/lib/constants";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const KitchenName = ({id}:{id:string}) => {

  const [kitchenName,setKitchenName] = useState<string|null>(null)
  const kitchenId = useParams().slug;
  const getKitchenName = async (id:string) => {
    let { data: kitchens, error } = await clientSupabase
      .from("kitchens")
      .select("kitchenName")
      .eq("id", id);
    if(kitchens?.[0]){
        setKitchenName(kitchens[0].kitchenName)
    }
  };
  useEffect(()=>{
    if(!kitchenName){
        getKitchenName(kitchenId as string)

    }
  },[kitchenId])
  return <div>{kitchenName||""}</div>;
};

export default KitchenName;
