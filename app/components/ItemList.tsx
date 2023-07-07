import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

interface IPantryList {
  id: string;
  ingridient: string;
  image: string;
}

const getPantryItems = async (): Promise<IPantryList[]> => {
  const response = await import("@/app/api/pantry/route");
  return await (await response.GET()).json();
};

const ItemList = async () => {
  const items = await getPantryItems();

  return (
    <div className="px-5 m-5">
      {items.map((item) => (
        <Card className="mb-5" key={item.id}>
          <CardHeader>
            <CardTitle>{item.ingridient}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              style={{
                objectFit: "cover",
                width:"100%"
              }}
              width={215}
              height={100}
              src={item.image}
              alt={item.ingridient}
            />
          </CardContent>
          <CardFooter>
            <Button>View</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ItemList;
