import React from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import AppLogo from "../../components/AppLogo";
import SearchInput from "../../components/SearchInput";
import ShowCard from "../../components/ShowCard";
import NoResults from "../../components/NoResults";
import { searchShows } from "../../Api";
import { Show } from "../../Interfaces";
import "./SearchResult.css";

interface Params {
  query: string;
}
const SearchResult: React.FC = () => {
  const params: Params = useParams();
  const history = useHistory();

  const [search, setSearch] = React.useState<string>(params.query || "");
  const [loading, setLoading] = React.useState<boolean>(true);
  const [shows, setShows] = React.useState<Array<Show>>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) return;
    window.location.replace(`/search/${search}`);
  };

  const handleCardClick = (showId: number): void => {
    history.push(`/tvshow/${showId}`);
  };

  const renderShows = (): any => {
    if (shows.length) {
      return shows.map((show: Show, index: number) => (
        <ShowCard
          key={`show-${index}`}
          thumbnail={show.image?.medium || ""}
          title={show.name}
          rating={show.rating.average}
          genres={show.genres}
          releaseDate={show.premiered}
          handleClick={(e) => handleCardClick(show.id)}
        />
      ));
    }
    if (!loading && !shows.length) return <NoResults />;
    return null;
  };

  React.useEffect(() => {
    searchShows(search)
      .then((data) => {
        setLoading(false);
        setShows(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <div className="search-result">
      <div className="search-box">
        <Link to="/">
          <AppLogo className="app-logo" />
        </Link>
        <form onSubmit={handleSubmit}>
          <SearchInput
            containerClassName="search-input-container"
            handleOnChange={handleChange}
            placeHolder="Search for your show ..."
            value={search}
            onClear={() => setSearch("")}
            loading={loading}
            readOnly={loading}
          />
        </form>
      </div>
      <div className="shows-list">{renderShows()}</div>
    </div>
  );
};

export default SearchResult;
