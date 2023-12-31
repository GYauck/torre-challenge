import axios from "axios";
import { useEffect, useState } from "react";
import { MdOutlineVerified } from "react-icons/md";

const Favourites = () => {
  const token = localStorage.getItem("token");

  const [favourites, setFavourites] = useState<string[]>([]);

  const getFavourites = async () => {
    try {
      const res = await axios.get(
        "https://torre-challenge-server-production.up.railway.app/api/favourites/getFavourites",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavourites(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavourite = async (favouriteId: any) => {
    try {
      await axios.post(
        `https://torre-challenge-server-production.up.railway.app/api/favourites/removeFavourite/${favouriteId}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFavourites((prevFavourites) =>
        prevFavourites.filter((favourite: any) => favourite._id !== favouriteId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <>
      <div className="">
        {favourites.map((favourite: any) => (
          <div className="flex flex-col  justify-center items-center  bg-black">
            <div className="flex justify-evenly rounded-2xl w-1/2 bg-gray-800 mb-4 h-40">
              <div className="mr-6 mt-4">
                <img
                  className="w-14 h-14 rounded-2xl"
                  src={favourite.picture}
                  alt=""
                />
              </div>
              <div className="w-1/2 mt-4">
                <h1 className="flex text-lime-600 items-center">
                  {favourite.name}
                  <p>
                    {favourite.verified && (
                      <MdOutlineVerified className="text-gray-400 ml-4" />
                    )}
                  </p>
                </h1>
                <h2 className="text-gray-500">
                  {favourite.professionalHeadline}
                </h2>
              </div>
              <div className="flex items-end h-full pb-3">
                <button
                  onClick={() => removeFavourite(favourite._id)}
                  className="rounded-3xl border-2 h-10 mr-5 bg-lime-600"
                >
                  REMOVE FAVOURITE
                </button>
                <button className="rounded-3xl border-2 h-10 bg-lime-600">
                  GNOME
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;
