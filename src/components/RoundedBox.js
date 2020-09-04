import React from 'react';

const RoundedBox = ({ children }) => {
  return (
    <div className="w-1/3 p-4 rounded-lg border border-solid border-gray-400">
      {children}
    </div>
  );
};

export default RoundedBox;
