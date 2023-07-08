import { DataTable } from "@/app/components/DataTable";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import Filter from "../components/Filter";
import Search from "../components/Search";
import { IPantryList, columns } from "./columns";
import AddDrawer from "../components/AddDrawer";

const getPantryItems = async (): Promise<IPantryList[]> => {
  const response = await import("@/app/api/pantry/route");
  return await (await response.GET()).json();
};

const filterOptions = [
  {
    label: "Running low",

  },
  {
    label: "Expiring soon",

  },
  {
    label: "Wishlisted",
  },
];
const sortOptions=[{
  label:"Ascending",

},
{
  label:"Descending"
}
]
export default async function Pantry () {
  const data = await getPantryItems();
  
  return (
    <>
    <div className=" px-5 mx-5 flex justify-between">
      <h3 className=" text-xl">Food Pantry</h3> <AddDrawer/>
    </div>
      <Search/>
      <div className="px-5 mx-5 flex justify-between flex-col ">
        <Filter filterOptions={filterOptions} filterName="Status" filterDefault={filterOptions[0].label}/>
        <Filter isRadio filterOptions={sortOptions} filterName="Sort Order" filterDefault={sortOptions[0].label}/>
      </div>
      <section className="px-5 m-5">
       <DataTable columns={columns} data={data}/>
      </section>
    </>
  );
}
