import React from "react";
import { useParams } from "react-router-dom";
import AppLogo from "../../components/AppLogo";
import SearchInput from "../../components/SearchInput";
import "./SearchResult.css";

interface Params {
  query: string;
}
const SearchResult: React.FC = () => {
  const params: Params = useParams();
  const [search, setSearch] = React.useState<string>(params.query || "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <div className="search-result">
      <div className="search-box">
        <AppLogo className="app-logo" />
        <form action="">
          <SearchInput
            containerClassName="search-input-container"
            handleOnChange={handleChange}
            placeHolder="Search for your show ..."
            value={search}
            onClear={() => setSearch("")}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchResult;
