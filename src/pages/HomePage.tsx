import React from "react";
import { useSearchUsersQuery } from "../store/github/github.api";

const HomePage = () => {
  const { isError, isLoading, data } = useSearchUsersQuery("Minkail");
  const [search, setSearch] = React.useState("")


  React.useEffect(() => {
    
  }, [search])


  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && <p className="text-center text-red-600"> Ошибка</p>}

      <div className="relative w-[560px]">
        <input
          value={search}
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search for github Username..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae,
          totam aliquam provident natus deleniti maiores vel ipsam earum
          cupiditate nostrum consequuntur ad recusandae laboriosam excepturi
          officiis, quia expedita quod eum?
        </div>
      </div>
    </div>
  );
};

export default HomePage;
