import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons"
import Filter from "../components/Filter";
import ItemList from "../components/ItemList";
import Search from "../components/Search";
import Sort from "../components/Sort";

export default function Pantry() {
  return (
    <>
    <div className=" px-5 mx-5 flex justify-between">
      <h3 className=" text-xl">Food Pantry</h3> <Button> <PlusCircledIcon className="mr-2 h-4 w-4"/> Add Item</Button>
    </div>
      <Search/>
      <div className=" px-5 mx-5 flex justify-between">
        <Filter/>
        
      </div>

      <section>
        <ItemList/>
      </section>
    </>
  );
}
