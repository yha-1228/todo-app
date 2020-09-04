import React from 'react';
import classNames from 'classnames'

const HeadingLv1 = ({ children }) => {
  return (
    <h2 className={classNames('mb-4', "text-5xl", "font-bold")}>{children}</h2>
  );
};

export default HeadingLv1;
