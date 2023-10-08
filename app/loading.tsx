import CardListSkelleton from "./_components/skelletons/CardListSkelleton"


const loading = () => {
  return (
    <div className=" md:px-12 lg:px-24 xl:px-32">

      <CardListSkelleton/>
    </div>
  )
}

export default loading