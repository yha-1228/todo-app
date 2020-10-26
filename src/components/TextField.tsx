import React from "react";
import classNames from "classnames";

const TextField: React.FC<any> = (props) => {
  return (
    <input
      className={classNames(
        "px-2",
        "bg-gray-200",
        "border-2",
        "border-solid",
        "border-gray-200",
        "rounded",
        "focus:outline-none",
        "focus:bg-white",
        "focus:border-apple-default-blue"
      )}
      type="text"
      {...props}
    />
  );
};

export default TextField;
