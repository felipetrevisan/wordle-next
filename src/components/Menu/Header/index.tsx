import React from 'react';
import { IoCogSharp } from 'react-icons/io5';

const MenuHeader: React.FC = () => {
  return (
    <div className="mt-2 flex justify-between">
      <IoCogSharp
        size={24}
        className="text-slate-400 hover:text-green-400 cursor-pointer"
      />
    </div>
  );
};

export default MenuHeader;
