import { MdOutlineVerified } from "react-icons/md";


interface CardsProps {
    parsedElement: any
}

const Cards: React.FC<CardsProps> = ({parsedElement}) => {
    console.log(parsedElement)
  return (
    <div  className="flex justify-evenly  w-full bg-gray-800 mb-4 h-40">
        <img className="w-14 h-14 rounded-2xl mr-4 m" src={parsedElement.imageUrl} alt="" />
    <div className="">
        <h1 className="flex text-lime-600 items-center">{parsedElement.name} 
        <p>{parsedElement.verified && <MdOutlineVerified className="text-gray-400 ml-4"/>}</p>
        </h1>
        <h2 className="text-gray-500">{parsedElement.professionalHeadline}</h2>
    </div>
    <div className="flex items-end mb-4">
    <button className="rounded-3xl border-2 h-10 mr-5">ADD FAVOURITE</button>
    <button className="rounded-3xl border-2 h-10">GNOME</button>

    </div>
    </div>
  )
}

export default Cards