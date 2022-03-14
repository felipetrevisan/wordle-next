import React from 'react';

type MenuItemProps = {
  icon?: string;
  onClick?: () => void;
};

const MenuItem: React.FC<MenuItemProps> = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="w-60 bg-green-500 text-gray-50 p-3 rounded-2xl select-none hover:bg-cyan-800 hover:animate-pulse shadow focus:outline-none focus:shadow-outline skew-y-6"
    >
      {children}
    </button>
  );
};

export default MenuItem;
