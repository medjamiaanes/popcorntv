import React from "react";
import "./AppLogo.css";

interface Props {
  className?: string;
  customStyle?: React.CSSProperties;
}
const AppLogo: React.FC<Props> = ({ customStyle, className }) => {
  return (
    <h1 className={`app-logo ${className}`} style={customStyle}>
      POPCORN<span>TV.</span>
    </h1>
  );
};

export default AppLogo;
