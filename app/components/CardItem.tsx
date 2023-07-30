"use client";

import { Card } from "@/components/ui/card";
import { useState } from "react";

const CardItem = () => {
  const [active, handleActive] = useState(false);
  return (
    <Card
      className="relative border-none shadow-none"
      style={{
        transition: "0.9s",
      }}
      onClick={() => {
        handleActive(!active);
      }}
    >
      <div>
        <Card
          id="top"
          className={
            "w-full bg-slate-500 absolute h-11 flex duration-150 origin-bottom justify-center items-center"
          }
          style={
            active
              ? {
                  transform: "rotate3d(1,0,0,-180deg)",
                  zIndex: "10",
                }
              : {
                transitionDelay:"0.3s",
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
            <p>topmost card</p>
          </div>
        </Card>
      </div>
      <div className="absolute w-full">
        <Card
          id="under-top-one"
          className={
            "w-full absolute bg-slate-400  h-11 flex duration-150 origin-bottom justify-center items-center"
          }
        >
          Under card top
        </Card>
        <div>
          <Card
            id="top"
            className={
              "w-full relative bg-slate-200  h-11 flex duration-150 origin-bottom justify-center items-center"
            }
            style={
              active
                ? {
                    transform: "rotate3d(1,0,0,-180deg)",
                    zIndex: "30",
                  }
                : {
                  transitionDelay:"0.3s",
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
              <p>under fliped topmost card</p>
            </div>
            <Card
              id="top"
              className={
                "w-full absolute bg-slate-100  h-11 flex duration-150 origin-top justify-center items-center"
              }
              style={
                active
                  ? {
                      transitionDelay:"0.3s",
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
                <p>last</p>
              </div>
            </Card>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
