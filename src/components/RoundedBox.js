import React from 'react';
import classNames from 'classnames';

const RoundedBox = ({ children }) => {
  return (
    <div
      className={classNames(
        'p-4',
        'bg-white',
        'rounded-lg',
        'border',
        'border-solid',
        'border-gray-200',
        'text-xl'
      )}
    >
      {children}
    </div>
  );
};

export default RoundedBox;
