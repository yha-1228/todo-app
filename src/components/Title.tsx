import React from "react";
import classnames from "classnames";

const Title: React.FC = ({ children }) => {
  return <h2 className={classnames("text-3xl", "font-bold")}>{children}</h2>;
};

export default Title;
