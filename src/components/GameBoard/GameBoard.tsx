export type PlayerSymbol = 'X' | 'O' | null;

export type Square = {
  row: number,
  col: number
}

export type Turn = {
  square: Square,
  player: PlayerSymbol
}

const initialGameBoard: PlayerSymbol[][] = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

interface GameBoardProps {
  onSelectSquare: (rowIndex: number, colIndex: number) => void,
  turns: Turn[]
}

export default function GameBoard(props: GameBoardProps) {
  let gameBoard = initialGameBoard;

  for (const turn of props.turns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  // const [gameBoard, setGameBoard] = useState<playerSymbol[][]>(initialGameBoard)

  // function handleSelectSquare(rowIndex: number, colIndex: number) {
  //   setGameBoard((prevGameBoard) => {
  //     const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //     updatedBoard[rowIndex][colIndex] = props.activePlayerSymbol;
  //     return updatedBoard;
  //   });

  //   props.onSelectSquare();
  // }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => props.onSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  )
}