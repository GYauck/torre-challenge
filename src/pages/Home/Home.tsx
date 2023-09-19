import { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import Cards from "../../components/Cards/Cards";


const Home = () => {
  const [searchResult, setSearchResult] = useState<string[]>([]);
 
  return (
    <>
    <div className="flex flex-col min-h-screen justify-center items-center w-screen bg-black">
      <SearchBar setSearchResult={setSearchResult} />
      <div>
      {searchResult.map((element, index)=> {
        if(element == "" || element == " ") return
        const parsedElement = JSON.parse(element)
        return <Cards parsedElement={parsedElement} key={index}/>
      })}
      </div>
    </div>
    </>
  );
};

export default Home;
