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
import Filter from "./Filter";
import { recipeTypes } from "@/lib/constants";

const RecipieList = () => {
  const kitchenid = useParams().slug as string;
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [isFav,setIsFav] = useState(false)
  const [type,setType] = useState("")
  const { data, error, isLoading } = useSWR(
    ["[recipies]-list", kitchenid, page, search,isFav,type],
    ([url, kitchenid, page]) => getRecipeList(url, kitchenid, page, search,`${isFav}`,type),
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
  const handleTypes=(e:string[])=>{
    if(e[0]){
      setType(e[0])
    }else if (e[0]===recipeTypes[0].value){
      setType("")
    }else{
      setType("")
    }
    
  }
  const handleFav=(e:string[])=>{
    console.log(e);
    if(e[0]==="True"){
      setIsFav(true)
    }else{
      setIsFav(false)
    }
  }
  return (
    <div className=" md:px-24 lg:px-32 xl:px-64">
      <Search onChange={handleSearchChange} />
      <Filter onChange={handleTypes} filterName="Types" filterDefault="All" filterOptions={recipeTypes}/>
      <Filter onChange={handleFav} filterName="Show favourites" filterDefault="False" filterOptions={[{label:"True"},{label:"False"}]}/>
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
