import React, { Fragment, useEffect, useState } from 'react';

import Keyboard from '../Keyboard';
import GuessBoardGrid from '../GuessBoard/Grid';

import { AlertContainer } from '../Alerts/AlertContainer';
import { useAlert } from '@/contexts/AlertContext';
import { isWinningWord, isWordInWordList, solution } from '@/utils/words';
import {
  REVEAL_TIME_MS,
  MAX_WORD_LENGTH,
  ALERT_TIME_MS,
  MAX_CHALLENGES,
} from '@/config/settings';

type GameProps = {
  mode: 'offline' | 'online';
  readOnly?: boolean;
};

const Game: React.FC<GameProps> = ({ mode, readOnly }) => {
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert();
  const [currentGuess, setCurrentGuess] = useState('');
  const [currentTileClass, setCurrentTileClass] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [guesses, setGuesses] = useState<string[]>([]);

  useEffect(() => {
    console.log('Youre playing in mode:', mode);
  }, []);

  const onTyping = (value: string) => {
    if (
      currentGuess.length < MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = () => {
    if (isGameWon || isGameOver) return;

    if (!(currentGuess.length === MAX_WORD_LENGTH)) {
      showErrorAlert('Not enough letters');
      setCurrentTileClass('shake');

      return setTimeout(() => {
        setCurrentTileClass('');
      }, ALERT_TIME_MS);
    }

    if (!isWordInWordList(currentGuess)) {
      showErrorAlert('Word not found');
      setCurrentTileClass('shake');

      return setTimeout(() => {
        setCurrentTileClass('');
      }, ALERT_TIME_MS);
    }

    // enforce hard mode - all guesses must contain all previously revealed letters
    // if (isHardMode) {
    //   const firstMissingReveal = findFirstUnusedReveal(currentGuess, guesses)
    //   if (firstMissingReveal) {
    //     showErrorAlert(firstMissingReveal)
    //     setCurrentRowClass('jiggle')
    //     return setTimeout(() => {
    //       setCurrentRowClass('')
    //     }, ALERT_TIME_MS)
    //   }
    // }

    setIsRevealing(true);
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false);
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH);

    const winningWord = isWinningWord(currentGuess);

    if (
      currentGuess.length === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess]);
      setCurrentGuess('');

      if (winningWord) {
        //setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true);
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        //setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameOver(true);
        showErrorAlert(`The word was ${solution}`, {
          persist: true,
          delay: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        });
      }
    }
  };

  return (
    <Fragment>
      <AlertContainer />
      <GuessBoardGrid
        guesses={guesses}
        currentGuess={currentGuess}
        isRevealing={isRevealing}
        currentTileClass={currentTileClass}
        readOnly={readOnly}
      />
      {!readOnly && (
        <Keyboard
          guesses={guesses}
          isRevealing={isRevealing}
          onEnter={onEnter}
          onDelete={onDelete}
          onTyping={onTyping}
        />
      )}
    </Fragment>
  );
};

export default Game;
