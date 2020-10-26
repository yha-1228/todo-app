import React from "react";
import classNames from "classnames";

const List: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{ lineHeight: "32px" }}
      className={classNames("py-2", "border-solid", "border-b", "border-gray-200")}
    >
      {children}
    </div>
  );
};

export default List;
