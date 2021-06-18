import React from "react";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import "./SearchInput.css";

interface Props {
  containerStyles?: React.CSSProperties;
  inputStyles?: React.CSSProperties;
  placeHolder: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  value?: string;
  containerClassName?: string;
  inputClassName?: string;
}

const SearchInput: React.FC<Props> = ({
  handleOnChange,
  onClear,
  placeHolder,
  containerStyles,
  inputStyles,
  value,
  containerClassName,
  inputClassName,
}) => {
  return (
    <div
      className={`search-input-container ${containerClassName}`}
      style={containerStyles}
    >
      <SearchOutlined className="search-icon" />
      <input
        type="text"
        placeholder={placeHolder}
        onChange={handleOnChange}
        style={inputStyles}
        className={`search-input ${inputClassName}`}
        value={value}
      />
      {value ? (
        <CloseOutlined className="clear-icon" onClick={onClear} />
      ) : null}
    </div>
  );
};

export default SearchInput;
