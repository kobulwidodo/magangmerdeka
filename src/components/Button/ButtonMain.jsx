import React from 'react';

export const ButtonMain = ({ children, className, ...rest }) => {
  return (
    <button
      className={`bg-[#7839F3] text-white py-3 px-10 hover:bg-[#915aff] ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
