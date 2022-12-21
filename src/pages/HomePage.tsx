import React from "react";
import {
  useLazyGetUserReposQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import { useDebounced } from "../hooks/debounce";
import RepoCard from "../components/RepoCard";

const HomePage = () => {
  const [search, setSearch] = React.useState("");
  const debounced = useDebounced(search);
  const [dropDown, setDropDown] = React.useState(false);
  const { isError, isLoading, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposQuery();

  React.useEffect(() => {
    console.log(debounced);
    setDropDown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropDown(false)
  };

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
        {dropDown && (
          <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md overflow-scroll bg-white">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((users) => {
              return (
                <li
                  key={users.id}
                  onClick={() => clickHandler(users.login)}
                  className="py-2 px-4 cursor-pointer hover:bg-gray-500 hover:text-white transition-colors"
                >
                  {users.login}
                </li>
              );
            })}
          </ul>
        )}
        <div>
          {areReposLoading && (
            <p className="text-center">Repos are Loading...</p>
          )}
          {repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
