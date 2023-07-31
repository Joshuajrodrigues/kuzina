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
      className="mb-12 relative border-none shadow-none cursor-pointer"
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
      onClick={() => {
        handleActive(!active);
      }}
    >
      <div>
        <Card
          id="top"
          className={
            "w-full absolute h-20 flex duration-150 origin-bottom justify-center items-center "
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
          className={
            "w-full absolute h-20 flex duration-150 origin-bottom justify-center items-center"
          }
        >
          {firstCard}
        </Card>
        <div>
          <Card
            id="top"
            className={
              "w-full relative h-20 flex duration-150 origin-bottom justify-center items-center"
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
              }}
            >
              {middleCard}
            </div>
            <Card
              id="top"
              className={
                "w-full  absolute h-20 flex duration-150 origin-top justify-center items-center"
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
