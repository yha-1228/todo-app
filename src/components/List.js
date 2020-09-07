import React from 'react';
import classNames from 'classnames';

const List = ({ children }) => {
  return (
    <div
      style={{ lineHeight: '32px' }}
      className={classNames(
        'py-1',
        'border-solid',
        'border-b',
        'border-gray-500'
      )}
    >
      {children}
    </div>
  );
};

export default List;
