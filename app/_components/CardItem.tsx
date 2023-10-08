"use client";

import { Card } from "@/components/ui/card";
import React, { FC, ReactNode, useState } from "react";

const CardItem:FC<{
  topCard:ReactNode,
  firstCard:ReactNode
  middleCard:ReactNode,
  lastCard:ReactNode
}> = ({
  topCard,
  firstCard,
  middleCard,
  lastCard
}) => {
  const [active, handleActive] = useState(false);
  return (
    <Card
      className="mb-12 relative bg-transparent border-none shadow-none cursor-pointer border-primary"
      style={
        active
          ? {
              transition: "1s",
              height: "200px",
            }
          : {
              transition: "1.5s",
              height: "40px",
            }
      }
    
    >
      <div>
        <Card
          id="top"
          onClick={(e) => {
            if(!active){
              handleActive(!active);
            }
          }}
          className={
            "w-full absolute h-20 flex duration-150 origin-bottom justify-center items-center  border-primary"
          }
          style={
            active
              ? {
                  transform: "rotate3d(1,0,0,-180deg)",
                  zIndex: "10",
                }
              : {
                  transitionDelay: "0.3s",
                  transform: "rotate3d(1,0,0,0deg)",
                  zIndex: "30",
                }
          }
        >
          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(0deg)",
              width:"100%"
            }}
          >
            {topCard}
          </div>
        </Card>
      </div>
      <div className="inline-block relative w-full">
        <Card
          id="under-top-one"
          onClick={(e) => {
            if(active){
              handleActive(!active);
            }
          }}
          className={
            "w-full  border-2 absolute h-20 flex duration-150 origin-bottom justify-center items-center  border-primary"
          }
        >
          {firstCard}
        </Card>
        <div>
          <Card
            id="top"
            onClick={(e) => {
              if(active){
                handleActive(!active);
              }
            }}
            className={
              "w-full  border-2 relative h-20 flex duration-150 origin-bottom justify-center items-center  border-primary"
            }
            style={
              active
                ? {
                    transform: "rotate3d(1,0,0,-180deg)",
                    zIndex: "30",
                  }
                : {
                    transitionDelay: "0.3s",
                    transform: "rotate3d(1,0,0,0deg)",
                    zIndex: "10",
                  }
            }
          >
            <div
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateX(180deg)",
                width:"100%"
              }}
            >
              {middleCard}
            </div>
            <Card
              id="top"
              onClick={(e) => {
                if(active){
                  handleActive(!active);
                }
              }}
              className={
                "w-full border-2  absolute h-20 flex duration-150 origin-top justify-center items-center  border-primary"
              }
              style={
                active
                  ? {
                      transitionDelay: "0.3s",
                      transform: "rotate3d(1,0,0,-180deg)",
                      zIndex: "10",
                    }
                  : {
                      transform: "rotate3d(1,0,0,0deg)",
                      zIndex: "30",
                    }
              }
            >
              <div
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateX(0deg)",
                  width:"100%"
                }}
              >
                {lastCard}
              </div>
            </Card>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
