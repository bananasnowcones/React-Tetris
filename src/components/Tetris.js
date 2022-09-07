import React, { useState } from 'react';

import { createStage, checkCollision } from '../gameHelpers';

// Styled Components
import { StyledTetrisWrapper, StyledTetris } from './styled-components/StyledTetris';

// Custom Hooks
import { useInterval } from '../hooks/useInterval';
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';
import { useGameStatus } from '../hooks/useGameStatus';

// Components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';



const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
  const [stage, setStage, rowsCleared] = useStage(player, resetPlayer);
  const [score, setScore, rows, setRows, level, setLevel] = useGameStatus(rowsCleared);


  console.log('re-render');

  const movePlayer = direction => {
    if (!checkCollision(player, stage, {x: direction, y: 0})) {
      updatePlayerPos({x: direction, y: 0});
    }
  }

  const startGame = () => {
    // Reset everything
    setStage(createStage());
    setDropTime(700);
    resetPlayer();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  }

  const drop = () => {
    // Increase level when player clears 10 rows
    if (rows > (level + 1) * 10) {
      setLevel(prev => prev + 1);
      setDropTime(700 / (level + 1) + 150);
    }
    if (!checkCollision(player, stage, {x: 0, y: 1})) {
      updatePlayerPos({x: 0, y: 1, collided: false})
    } 
	else {
      // Game Over
      if (player.pos.y < 1) {
        console.log("GAME OVER");
        setGameOver(true);
        setDropTime(null);
      }
      updatePlayerPos({x: 0, y: 0, collided: true});
    }
  }

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      // Down arrow key
      if (keyCode === 40) {
        setDropTime(700 / (level + 1) + 150);
      }
    }
  }

  const dropPlayer = () => {
    setDropTime(null);
    drop();
  }

  const move = ({ keyCode }) => {
    if (!gameOver) {
      // left arrow
      if (keyCode === 37) {
        movePlayer(-1);
      }
      // right arrow 
      else if (keyCode === 39) {
        movePlayer(1);
      }
      // down arrow
      else if (keyCode === 40) {
        dropPlayer();
      }
      // Z key
      else if (keyCode === 90) {
        playerRotate(stage, 1);
      }
      // X key
      else if (keyCode === 88) {
        playerRotate(stage, -1);
      }

    }
  }
  
  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)} onKeyUp={keyUp}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? 
            <Display gameOver={gameOver} text="Game Over!"/> : (
            <div>
            <Display text={`Score: ${score}`} />
            <Display text={`Rows: ${rows}`} />
            <Display text={`Level: ${level}`} />
            </div>)
          }
          <StartButton callback={startGame}/>
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;