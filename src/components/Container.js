import React from 'react';
import classNames from 'classnames';

const Container = ({ children }) => {
  return (
    <div className={classNames('container', 'mx-auto', 'px-1')}>{children}</div>
  );
};

export default Container;
