"use client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import AddDrawer from "./AddDrawer";
import Search from "./Search";
import CardListSkelleton from "./skelletons/CardListSkelleton";

const RecipieList = () => {
  return (
    <div>
      <Search onChange={() => {}} />
      <div className=" px-5 m-5 flex justify-between">
        <AddDrawer
          title="Add recipes"
          triggerName={
            <>
              <PlusCircledIcon className="mr-2 h-4 w-4" />
              Add recipes
            </>
          }
          recipeForm
          apiToMutate="[pantry]-list"
        />
      </div>
      {true ? <CardListSkelleton /> : <></>}
    </div>
  );
};

export default RecipieList;
