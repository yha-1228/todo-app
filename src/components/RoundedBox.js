import React from 'react';
import classNames from 'classnames';

const RoundedBox = ({ children }) => {
  return (
    <div
      className={classNames(
        'w-1/3',
        'p-4',
        'rounded-lg',
        'border',
        'border-solid',
        'border-gray-900'
      )}
    >
      {children}
    </div>
  );
};

export default RoundedBox;
