"use client"
import { ColumnDef } from "@tanstack/react-table"

export interface IPantryList {
    id: string;
    ingridient: string;
    image: string;
    quantity:string
  }

  export const columns: ColumnDef<IPantryList>[] = [
    {
      accessorKey: "ingridient",
      header: "Ingridient",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell({row}) {
        return<div className=" text-center">
        {row.getValue("quantity")}
        </div>
      },
    },
  ]