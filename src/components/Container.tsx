import React from 'react';
import classNames from 'classnames';

const Container: React.FC = ({ children }) => {
  return (
    <div className={classNames('container', 'mx-auto', 'px-4')}>{children}</div>
  );
};

export default Container;
