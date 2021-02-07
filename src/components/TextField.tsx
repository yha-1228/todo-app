import React from "react";
import classnames from "classnames";

const TextField: React.FC<any> = (props) => {
  return (
    <input
      className={classnames(
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
