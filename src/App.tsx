import { useState } from 'react';

import Player from './components/Player/Player';
import GameBoard, { PlayerSymbol, Turn } from './components/GameBoard/GameBoard';
import Log from './components/Log/Log';

function App() {
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const [activePlayer, setActivePlayer] = useState<PlayerSymbol>('X');

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      let currentPlayer: PlayerSymbol = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
