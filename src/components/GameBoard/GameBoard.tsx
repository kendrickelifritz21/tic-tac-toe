import './GameBoard.css'

export type PlayerSymbol = 'X' | 'O' | null;

export type Square = {
  row: number,
  col: number
}

export type Turn = {
  square: Square,
  player: PlayerSymbol
}

interface GameBoardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void,
  board: PlayerSymbol[][]
}

export default function GameBoard(props: GameBoardProps) {
  return (
    <ol id="game-board">
      {props.board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => props.onSelectSquare(rowIndex, colIndex)} disabled={playerSymbol !== null}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}