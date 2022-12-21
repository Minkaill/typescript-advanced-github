import React from "react";
import { useActions } from "../hooks/actions";
import { IRepo } from "../models/models";
import { useAppSelector } from "../hooks/redux";

const RepoCard = ({ repo }: { repo: IRepo }) => {
  const { addFavorite, removeFavorites } = useActions();
  const { favorites } = useAppSelector((state) => state.github);

  const [Fav, setFav] = React.useState(favorites.includes(repo.html_url));

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavorite(repo.html_url);
    setFav(true);
  };

  const removeFromFavorite = () => {
    removeFavorites(repo.html_url);
    setFav(false);
  };

  return (
    <div className="border py-3 px-5 rounded cursor-pointer mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank" rel="noreferrer">
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.forks}</span>
        </p>
        <p className="text-sm fount-thin">{repo.description}</p>
      </a>
      {!Fav && (
        <button
          className="py-2 px-4 mr-10 bg-yellow-400 rounded hover:shadow-md transition-all"
          onClick={addToFavorite}
        >
          Add to favorite
        </button>
      )}

      {Fav && (
        <button
          className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
          onClick={removeFromFavorite}
        >
          Remove to favorite
        </button>
      )}
    </div>
  );
};

export default RepoCard;
