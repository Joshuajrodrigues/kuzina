import { DataTable } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Filter from "../components/Filter";
import Search from "../components/Search";
import { IPantryList, columns } from "./columns";

const getPantryItems = async (): Promise<IPantryList[]> => {
  const response = await import("@/app/api/pantry/route");
  return await (await response.GET()).json();
};
export default async function Pantry () {
  const data = await getPantryItems();
  
  return (
    <>
    <div className=" px-5 mx-5 flex justify-between">
      <h3 className=" text-xl">Food Pantry</h3> <Button> <PlusCircledIcon className="mr-2 h-4 w-4"/> Add Item</Button>
    </div>
      <Search/>
      <div className=" px-5 mx-5 flex justify-between">
        <Filter/>
      </div>
      <section className="px-5 m-5">
       <DataTable columns={columns} data={data}/>
      </section>
    </>
  );
}
