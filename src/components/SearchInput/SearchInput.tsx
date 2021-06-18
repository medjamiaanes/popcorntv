import React from "react";
import {
  SearchOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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
  loading?: boolean;
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
  loading,
}) => {
  const renderRightIcon = (): any => {
    if (value && !loading)
      return <CloseOutlined className="right-icon" onClick={onClear} />;
    if (value && loading) return <LoadingOutlined className="right-icon" />;
    return null;
  };
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
      {renderRightIcon()}
    </div>
  );
};

export default SearchInput;
