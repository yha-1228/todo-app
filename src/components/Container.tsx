import React from "react";
import classnames from "classnames";

const Container: React.FC = ({ children }) => {
  return <div className={classnames("container", "mx-auto", "px-4")}>{children}</div>;
};

export default Container;
