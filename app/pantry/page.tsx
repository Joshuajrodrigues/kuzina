import AddDrawer from "../components/AddDrawer";
import CardItem from "../components/CardItem";
import Filter from "../components/Filter";
import FirstCard from "../components/FirstCard";
import LastCard from "../components/LastCard";
import MiddleCard from "../components/MiddleCard";
import Search from "../components/Search";
import TopCard from "../components/TopCard";
import { IPantryList } from "./columns";

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
const sortOptions = [
  {
    label: "Ascending",
  },
  {
    label: "Descending",
  },
];
export default async function Pantry() {
  const data = await getPantryItems();

  return (
    <>
      <div className=" px-5 mx-5 flex justify-between">
        <h3 className=" text-xl">Food Pantry</h3>
        <AddDrawer />
      </div>
      <Search />
      <div className="px-5 mx-5 flex justify-between flex-col ">
        <Filter
          filterOptions={filterOptions}
          filterName="Status"
          filterDefault={filterOptions[0].label}
        />
        <Filter
          isRadio
          filterOptions={sortOptions}
          filterName="Sort Order"
          filterDefault={sortOptions[0].label}
        />
      </div>
      <section className="px-5 m-5">
        {data?.map((item) => (
          <CardItem
            topCard={<TopCard />}
            firstCard={<FirstCard />}
            middleCard={<MiddleCard />}
            lastCard={<LastCard />}
          />
        ))}
        {/* 
        <CardItem/>
        <CardItem/>
        <CardItem/>
        <CardItem/>
        <CardItem/>
        <CardItem/>
        <CardItem/> */}
        {/* <DataTable columns={columns} data={data} /> */}
      </section>
    </>
  );
}
