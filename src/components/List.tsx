import React from "react"
import classnames from "classnames"

const List: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{ lineHeight: "32px" }}
      className={classnames("py-2", "border-solid", "border-b", "border-gray-200")}
    >
      {children}
    </div>
  )
}

export default List
