import AddDrawer from "../../../_components/AddDrawer";
import CardItem from "../../../_components/CardItem";
import Filter from "../../../_components/Filter";
import FirstCard from "../../../_components/FirstCard";
import LastCard from "../../../_components/LastCard";
import MiddleCard from "../../../_components/MiddleCard";
import Search from "../../../_components/Search";
import TopCard from "../../../_components/TopCard";
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
            topCard={<TopCard name={item.ingridient} quantity={ item.quantity } unit={item.unit} />}
            firstCard={<FirstCard expiryDate={item.expiryDate} updatedOn={item?.updatedOn} />}
            middleCard={<MiddleCard isInList={item.isInList} price={item?.price}/>}
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
