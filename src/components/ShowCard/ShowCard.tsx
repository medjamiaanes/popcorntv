import React from "react";
import { StarFilled } from "@ant-design/icons";
import noImage from "../../images/no-product-image.png";
import "./ShowCard.css";

interface Props {
  thumbnail: string;
  title: string;
  rating: number;
  releaseYear: string;
  genres: Array<string>;
}

const ShowCard: React.FC<Props> = ({
  thumbnail,
  title,
  rating,
  releaseYear,
  genres,
}) => {
  const renderThumbnail = (): React.ReactElement<HTMLImageElement> =>
    thumbnail ? (
      <img
        src={thumbnail}
        alt={`${title}-thumbnail`}
        className="show-thumbnail"
      />
    ) : (
      <img
        src={noImage}
        alt={`${title}-thumbnail`}
        className="show-thumbnail"
      />
    );
  return (
    <div className="show-card">
      {renderThumbnail()}
      <div className="show-infos">
        <h3 className="show-title">{title}</h3>
        <div className="year-genres">
          <h6 className="year">{new Date(releaseYear).getFullYear()}</h6>
          <h6 className="genres">
            {" "}
            {genres.map((genre, index) =>
              index === genres.length - 1 ? genre : `${genre},`
            )}
          </h6>
        </div>
        <div className="rating">
          <StarFilled className="rating-star" />
          <span className="rating-number">{rating || "-"}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
