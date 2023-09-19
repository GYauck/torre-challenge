import { Input } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { MdPersonSearch } from "react-icons/md";

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

interface SearchBoxProps {
  setSearchResult: any;
}

const SearchBar: React.FC<SearchBoxProps> = ({ setSearchResult }) => {
  const [query, setQuery] = useState<string>("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "https://torre.ai/api/entities/_searchStream",
        {
          query: query,
          identityType: "person",
          limit: 10,
          meta: true,
        }
      );
      setSearchResult(result.data.split("\n"));
    } catch (error) {
      console.log(error);
    }
  };

  const changeQuery = (event: InputChangeEvent): void => {
    setQuery(event.currentTarget.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.dispatchEvent(new Event("submit", { cancelable: true }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex">
      <MdPersonSearch size={35} color={"yellow"} />
      <Input
        crossOrigin="false"
        label="Search people by name"
        type="search"
        value={query}
        onChange={changeQuery}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="text-yellow-400">
        Submit
      </button>
    </form>
  );
};

export default SearchBar;
