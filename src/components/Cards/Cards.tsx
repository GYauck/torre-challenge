import axios from "axios";
import { MdOutlineVerified } from "react-icons/md";

interface CardsProps {
  parsedElement: any;
}

const Cards: React.FC<CardsProps> = ({ parsedElement }) => {

  const token = localStorage.getItem("token")

  const addFavourite = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/favourites/addFavourite",
        {
          ggId: parsedElement.ggId,
          name: parsedElement.name,
          picture: parsedElement.imageUrl,
          professionalHeadline: parsedElement.professionalHeadline,
          verified: parsedElement.verified,
        },{
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      console.log("first")
      return res.data
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-evenly rounded-2xl w-full bg-gray-800 mb-4 h-40">
      <div className="mr-6 mt-4">
        <img
          className="w-14 h-14 rounded-2xl"
          src={parsedElement.imageUrl}
          alt=""
        />
      </div>
      <div className="w-1/2 mt-4">
        <h1 className="flex text-lime-600 items-center">
          {parsedElement.name}
          <p>
            {parsedElement.verified && (
              <MdOutlineVerified className="text-gray-400 ml-4" />
            )}
          </p>
        </h1>
        <h2 className="text-gray-500">{parsedElement.professionalHeadline}</h2>
      </div>
      <div className="flex items-end h-full pb-3">
        <button onClick={addFavourite} className="rounded-3xl border-2 h-10 mr-5 bg-lime-600">
          ADD FAVOURITE
        </button>
        <button className="rounded-3xl border-2 h-10 bg-lime-600">GNOME</button>
      </div>
    </div>
  );
};

export default Cards;
