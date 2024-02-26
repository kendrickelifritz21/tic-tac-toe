import { useState } from 'react';

import Player from './components/Player/Player';
import GameBoard, { PlayerSymbol, Turn } from './components/GameBoard/GameBoard';
import Log from './components/Log/Log';
import { WINNING_COMBINATIONS } from './winning-combinations';
import GameOver from './components/GameOver/GameOver';

type PlayerNames = {
  X: string,
  O: string
}

const PLAYERS: PlayerNames = {
  X: 'Player 1',
  O: 'Player 2'
}

const INITIAL_GAME_BOARD: PlayerSymbol[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function deriveActivePlayer(gameTurns: Turn[]) {
  let currentPlayer: PlayerSymbol = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns: Turn[]): PlayerSymbol[][] {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard: PlayerSymbol[][], players: PlayerNames): string {
  let winner: string = '';

  for (const combination of WINNING_COMBINATIONS) { 
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].col]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState<Turn[]>([]);
  const [players, setPlayers] = useState<PlayerNames>(PLAYERS);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex: number, colIndex: number) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol: PlayerSymbol, newName: string) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol as string]: newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
          <Player name={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematch={handleRematch}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
