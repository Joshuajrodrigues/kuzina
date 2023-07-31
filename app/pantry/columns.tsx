"use client"
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export interface IPantryList {
    id: string;
    ingridient: string;
    image: string;
    quantity:string;
    unit:string;
  }

  export const columns: ColumnDef<IPantryList>[] = [
    {
      accessorKey: "id",
      header:"",
      cell(){
        return<>
            
        </>
      },
      
    },
    {
      accessorKey: "ingridient",
      header: "Item",
      
    },
    {
      accessorKey: "quantity",
      header() {
        return<div className=" text-center">
        Quantity
        </div>
      },
      
      cell({row}) {
        return<div className=" text-center">
        {row.getValue("quantity")}
        </div>
      },
    },
  ]