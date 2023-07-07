import { NextResponse } from "next/server";
import data from '@/app/api/items.json'

export async function GET() {
    return NextResponse.json(data)
}