import { useState } from 'react';
import './Player.css'

interface PlayerProps {
  name: string,
  symbol: string,
  isActive: boolean
}

export default function Player(props: PlayerProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>(props.name);

  function handleEditClick() {
    setIsEditing(editing => !editing);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(event.target.value);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      handleEditClick();
    }
  }

  return (
    <li className={props.isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing && <span className="player-name">{playerName}</span>}
        {isEditing && <input type="text" required value={playerName} onChange={handleChange} onKeyUp={handleKeyPress} />}
        <span className="player-symbol">{props.symbol}</span>
      </span>
      <button onClick={handleEditClick}>{!isEditing ? 'Edit' : 'Save'}</button>
    </li>
  );
}