import React from "react"
import classNames from "classnames"

const Button: React.FC<any> = (props) => {
  return (
    <button
      className={classNames(
        "px-4",
        "bg-gray-900",
        "text-white",
        "border-2",
        "border-solid",
        "border-gray-900",
        "rounded",
        "hover:bg-transparent",
        "hover:text-gray-900",
        "focus:outline-none",
        "focus:bg-transparent",
        "focus:text-gray-900"
      )}
      {...props}
    >
      {props.children}
    </button>
  )
}

export default Button
