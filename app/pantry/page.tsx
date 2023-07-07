import { Button } from "@/components/ui/button";
import AppliedFilters from "../components/AppliedFilters";
import Filter from "../components/Filter";
import { Header } from "../components/Header";
import ItemList from "../components/ItemList";
import Search from "../components/Search";
import Sort from "../components/Sort";

export default function Pantry() {
  return (
    <>
    <div className=" px-5 mx-5 flex justify-between">
      <h3 className=" text-xl">Food Pantry</h3> <Button>Add Item</Button>
    </div>
      <Search/>
      <div className=" px-5 mx-5 flex justify-between">
        <Sort/>
        <Filter/>
      </div>
      <div  className=" px-5 m-5 flex ">
        <AppliedFilters/>
      </div>
      <section>
        <ItemList/>
      </section>
    </>
  );
}
