import { Turn } from '../GameBoard/GameBoard'
import './Log.css'

interface LogProps {
  turns: Turn[]
}

export default function Log(props: LogProps) {
  return (
    <ol id="log">
      {props.turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} selected {turn.square.row},{turn.square.col}
        </li>
      ))}
    </ol>
  )
}