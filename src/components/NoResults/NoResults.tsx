import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./NoResults.css";

const NoResults: React.FC = () => {
  return (
    <div className="no-results">
      <SearchOutlined className="icon" />
      <h3 className="title">No results were found.</h3>
      <p className="message">
        Sorry, there were no results found matching your query.
      </p>
    </div>
  );
};

export default NoResults;
