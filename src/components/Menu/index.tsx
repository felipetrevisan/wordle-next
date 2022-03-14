import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { v4 } from 'uuid';

import MenuItem from './Item';

const Menu: React.FC = () => {
  const router = useRouter();

  const createGame = useCallback(() => {
    const gameId = v4();
    router.push(`/game/${gameId}`);
  }, []);

  return (
    <div className="flex flex-col gap-1 justify-center">
      <MenuItem onClick={() => createGame()}>Solo</MenuItem>
      <MenuItem onClick={() => router.push('/lobby/create')}>
        Create Game
      </MenuItem>
      <MenuItem onClick={() => router.push('/play')}>Join Game</MenuItem>
      <MenuItem onClick={() => router.push('/play')}>Settings</MenuItem>
    </div>
  );
};

export default Menu;
