import { NextRequest, NextResponse } from "next/server";
import data from "@/data/items.json";
import { z } from "zod";

let addIngridientSchema = z.object({
  id: z.string(),
  ingridient: z.string(),
  quantity: z.number(),
  unit: z.string(),
  expiryDate: z.string().optional(),
});

type ingridient = z.infer<typeof addIngridientSchema>;

export async function POST(request: NextRequest) {
  const req: ingridient = await request.json();
  const nextId = data.length + 1;
  req.id = String(nextId);
  const isValid = addIngridientSchema.safeParse(req).success;

  if (isValid) {
    data.push(req);
    return NextResponse.json(data);
  } else {
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
