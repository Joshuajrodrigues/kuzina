import { addKitchenSchema } from "@/app/_components/CreateKitchenForm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";



type kitchen = z.infer<typeof addKitchenSchema>


export async function POST(request:NextRequest){
    const req:kitchen = await request.json();
    const isValid = addKitchenSchema.safeParse(req).success
    if(isValid){
        // add to db
        //return kitchen id
    }else {
        return NextResponse.json(
          {
            message: "Invalid body",
          },
          {
            status: 400,
          }
        );
      }
}