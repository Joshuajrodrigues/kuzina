import PantryList from "@/app/_components/PantryList";
import AddDrawer from "../../../_components/AddDrawer";
import { QuickNav } from "@/app/_components/QuickNav";
import Help from "@/app/_components/Help";

export default async function Pantry() {
  return (
    <>
      <div className=" px-5 mx-5 flex justify-between">
        <QuickNav />
        <Help description="A journal of all the items that should belong kitchen "/>
      </div>
      <PantryList />
    </>
  );
}
