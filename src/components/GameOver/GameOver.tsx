import './GameOver.css'

interface GameOverProps {
  winner: string,
  onRematch: () => void
}

export default function GameOver(props: GameOverProps) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {props.winner && <p>{props.winner} won!</p>}
      {!props.winner && <p>It's a draw!</p>}
      <p>
        <button onClick={props.onRematch}>Rematch!</button>
      </p>
    </div>
  );
}