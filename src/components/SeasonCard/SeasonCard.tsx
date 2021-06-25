import React from "react";
import { Season } from "../../Interfaces";
import noImage from "../../images/no-product-image.png";
import "./SeasonCard.css";

const SeasonCard: React.FC<Season> = ({
  url,
  number,
  episodeOrder,
  premiereDate,
  summary,
  image,
}) => {
  return (
    <div className="season">
      <div className="season-details">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="season-number"
        >
          <h2>Season: {number}</h2>
        </a>
        <h5 className="season-date-episodes">
          {episodeOrder} Episodes in {premiereDate}
        </h5>
        <div className="summary">
          <p>{summary}</p>
        </div>
      </div>
      <img
        src={image?.original || noImage}
        alt={`season-${number}-thumbnail`}
        className="season-thumbnail"
      />
    </div>
  );
};

export default SeasonCard;
