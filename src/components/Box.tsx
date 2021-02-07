import React from "react"
import classnames from "classnames"

const Box: React.FC = ({ children }) => {
  return <div className={classnames("lg:w-1/3", "text-xl")}>{children}</div>
}

export default Box
