import React from "react";
import Card from "./Card";

interface IPantryList {
  id:string
  ingridient:string
  image:string

}

const getPantryItems = async ():Promise<IPantryList[]> => {
  const response = await import("@/app/api/pantry/route")
  return await ( await response.GET()).json()
};

const ItemList = async () => {
  const items = await getPantryItems();

  
  return <div className="px-5 m-5">
    {
        items.map((item)=>(
            <div key={item.id}>
               <Card name={item.ingridient} src={item.image} alt={item.ingridient} />
            </div>
        ))
    }
  </div>;
};

export default ItemList;
