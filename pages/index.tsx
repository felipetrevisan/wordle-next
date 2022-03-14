import type { NextPage } from 'next';

import Menu from '@/components/Menu';

const MenuPage: NextPage = () => {
  return (
    <div className="h-screen w-screen grid">
      <div className="flex justify-center">
        <Menu />
      </div>
    </div>
  );
};

export default MenuPage;
