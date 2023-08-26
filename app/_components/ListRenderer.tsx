
import { Button } from "@/components/ui/button";
import CardItem from "./CardItem";
import FirstCard from "./FirstCard";
import LastCard from "./LastCard";
import MiddleCard from "./MiddleCard";
import TopCard from "./TopCard";
import { Pantry } from "@/types/pantry";
import { Dispatch, SetStateAction } from "react";

const ListRenderer = ({
  res,
  count,
  page,
  setPage,
  apiToMutate
}: {
  res: Pantry[];
  count: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  apiToMutate:string
}) => {
  if (res?.length <= 0) {
    return (
      <div className="h-24 w-full cursor-pointer flex justify-center items-center ">
        <span>No items here right now :(</span>
      </div>
    );
  }
  return (
    <>
      <section className="px-5 m-5">
        {res?.map((item) => (
          <CardItem
            key={item?.id}
            topCard={
              <TopCard
                name={item?.item_name!}
                quantity={item?.quantity!}
                unit={item?.unit!}
              />
            }
            firstCard={
              <FirstCard
                expiryDate={item?.expiry_date!}
                updatedOn={item?.last_updated!}
              />
            }
            middleCard={
              <MiddleCard
                price={item?.price!}
                id={item?.id!}
                isInList={item?.addedToCart || false}
              />
            }
            lastCard={<LastCard apiToMutate={apiToMutate} id={item?.id!} />}
          />
        ))}
      </section>
      {!!count && count > 5 && (
        <section className=" m-5 p-5 flex justify-evenly  bottom-3">
          <Button disabled={page === 0} onClick={() => setPage(() => page - 5)}>
            Prev Page
          </Button>
          <Button
            disabled={page + 5 >= count}
            onClick={() => setPage(() => page + 5)}
          >
            Next Page
          </Button>
        </section>
      )}
    </>
  );
};

export default ListRenderer;
