import React from "react";
import "./TVShow.css";
import { Show, Season } from "../../Interfaces";
import { fetchShowById } from "../../Api";
import { useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import SeasonCard from "../../components/SeasonCard";
import noImage from "../../images/no-product-image.png";
interface Params {
  id: string;
}

const TVShow: React.FC = () => {
  const params: Params = useParams();
  const [showDetails, setShowDetails] = React.useState<Show | null>(null);
  const [showSeasons, setShowSeasons] = React.useState<Array<Season>>([]);

  React.useEffect(() => {
    fetchShowById(params.id)
      .then((data) => {
        setShowDetails(data.showDetails);
        setShowSeasons(data.showSeasons);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="tv-show">
      {showDetails ? (
        <div className="show-details">
          <div className="show-infos">
            <img
              src={showDetails.image?.original || noImage}
              alt={`${showDetails.name}-thumbnail`}
              className="show-thumbnail"
            />
            <div className="infos">
              <h1 className="show-title">{showDetails.name}</h1>
              <div className="show-date-genres">
                <h6 className="release-date">{showDetails.premiered}</h6>
                <h6 className="genres">
                  {showDetails.genres.map(
                    (genre: string, index: number, genres: Array<any>) =>
                      index === genres.length - 1 ? genre : `${genre},`
                  )}
                </h6>
              </div>
              <div className="rating">
                <span>Rated : </span>
                <StarFilled className="rating-star" />
                <h6 className="rating-number">
                  {showDetails.rating?.average || "-"}
                </h6>
              </div>
              <div className="summary">
                <p>{showDetails.summary}</p>
              </div>
            </div>
          </div>
          <div className="show-seasons">
            {showSeasons.map((season: Season, index: number) => (
              <SeasonCard {...season} key={`season-${index}}`} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TVShow;
