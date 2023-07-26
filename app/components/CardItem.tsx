"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";

const CardItem = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Card
      id="cardContainer"
      className={isActive ? " h-60 " : " h-20 "}
      onClick={() => setIsActive(!isActive)}
    >

      <div id="firstDisplay" className=" my-5 mx-6 text-center flex justify-between items-center">
        <div id="itemDetail" className="flex flex-col text-center">
            <span id="label" className="text-xs">Name</span>
            Banana Chips
        </div>
        <div id="itemDetail" className="flex flex-col  text-center">
            <span id="label" className="text-xs">Quantity</span>
            24
        </div>
      
      </div>
    </Card>
  );
};

export default CardItem;
