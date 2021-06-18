import React from "react";
import AppLogo from "../../components/AppLogo";
import SearchInput from "../../components/SearchInput";
import { useHistory } from "react-router-dom";
import "./Main.css";

const Main: React.FC = () => {
  const history = useHistory();
  const [search, setSearch] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    history.push(`/search/${search}`);
  };

  return (
    <div className="main">
      <AppLogo className="app-title" />
      <form onSubmit={handleSubmit}>
        <SearchInput
          placeHolder="Search for your show ..."
          handleOnChange={handleChange}
          containerStyles={{ marginTop: 32 }}
          value={search}
          onClear={() => setSearch("")}
        />
      </form>
    </div>
  );
};

export default Main;
