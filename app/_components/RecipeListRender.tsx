import { Button } from "@/components/ui/button";
import { Recipe, deleteRecipeItem } from "@/services/RecipesService";
import { Dispatch, SetStateAction } from "react";
import CardItem from "./CardItem";
import Empty from "./Empty";
import FirstCard from "./FirstCard";
import LastCard from "./LastCard";
import MiddleCard from "./MiddleCard";
import TopCard from "./TopCard";
import { Component1Icon, IdCardIcon, ListBulletIcon, MixIcon, ReaderIcon } from "@radix-ui/react-icons";
import { StickyNoteIcon } from "lucide-react";

const RecipeListRender = ({
    res,
    count,
    page,
    setPage,
    apiToMutate,
  }: {
    res: Recipe[];
    count: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    apiToMutate:string
  }) => {
    if (res?.length <= 0) {
        return (
          <div className="h-full w-full cursor-pointer flex justify-center items-center ">
            <Empty message="No items added"/>
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
              name={item?.recipie_name!}
              nameHeader={"Recipe name"}
              nameHeaderIcon={<IdCardIcon className="mr-1" />}
              type="Snack"
            />
          }
          firstCard={
            <FirstCard
              expiryDate={""}
              updatedOn={""}
              createdOn={item.created_at}
            />
          }
          middleCard={
            <MiddleCard
              isRecipe={true}
              icon={<MixIcon className="mr-1"/>}
              type={item?.type}
              id={item?.id!}
           
            />
          }
          lastCard={<LastCard recipeForm deleteService={deleteRecipeItem} apiToMutate={apiToMutate} id={item?.id!} />}
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
  )
}

export default RecipeListRender