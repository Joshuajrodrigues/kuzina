"use client";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import AddDrawer from "./AddDrawer";
import Search from "./Search";
import CardListSkelleton from "./skelletons/CardListSkelleton";
import { useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import useSWR from "swr";
import { Recipe, getRecipeList } from "@/services/RecipesService";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import RecipeListRender from "./RecipeListRender";

const RecipieList = () => {
  const kitchenid = useParams().slug as string;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, error, isLoading } = useSWR(
    ["[recipies]-list", kitchenid, page, search],
    ([url, kitchenid, page]) => getRecipeList(url, kitchenid, page, search),
    {
      revalidateOnFocus: false,
    }
  );
  let count: number = data?.count!;

  let res = data?.data!;
  if (error) return "Error loading list";
  console.log("res", res);

  const debouncedSearch = AwesomeDebouncePromise((query) => {
    setSearch(query);
  }, 1500);
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    debouncedSearch(query);
  };
  return (
    <div>
      <Search onChange={handleSearchChange} />
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
          apiToMutate="[recipies]-list"
        />
      </div>
      {isLoading ? (
        <CardListSkelleton />
      ) : (
        <>
          <RecipeListRender
            apiToMutate={"[recipies]-list"}
            setPage={setPage}
            page={page}
            res={res as Recipe[]}
            count={count}
          />

        </>
      )}
    </div>
  );
};

export default RecipieList;
