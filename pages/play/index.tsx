import { useEffect } from 'react';
import type { NextPage } from 'next';

import Game from '@/components/Game';
import socketService from '@/services/socket';

type PlayPageProps = {
  mode: 'offline' | 'online';
};

const PlayPage: NextPage<PlayPageProps> = ({ mode }) => {
  const connectServer = async () => {
    await socketService.connect('http://localhost:9000').catch((err) => {
      console.log('Error: ', err);
    });
  };

  useEffect(() => {
    if (mode === 'online') connectServer();
  }, [mode]);

  return (
    <div className="flex flex-row justify-center gap-12">
      <div className="flex flex-col gap-5">
        <Game mode={mode} />
      </div>
      <div className="flex flex-col gap-5">
        <Game mode={mode} readOnly />
      </div>
    </div>
  );
};

export default PlayPage;
