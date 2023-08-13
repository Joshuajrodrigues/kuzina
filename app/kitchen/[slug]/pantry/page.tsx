import PantryList from "@/app/_components/PantryList";
import AddDrawer from "../../../_components/AddDrawer";


export default async function Pantry() {
  return (
    <>
      <div className=" px-5 mx-5 flex justify-between">
        <h3 className=" text-xl">Food Pantry</h3>
        <AddDrawer />
      </div>
      <PantryList />
    </>
  );
}
