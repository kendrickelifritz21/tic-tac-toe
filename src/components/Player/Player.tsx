import { useState } from "react";

interface PlayerProps {
    name: string,
    symbol: string
}

export default function Player(props: PlayerProps) {
    const [isEditing, setIsEditing] = useState<boolean>(false);

    function handleEditClick() {
        setIsEditing(true);
    }

    return (
        <li>
            <span className="player">
                {!isEditing && <span className="player-name">{props.name}</span>}
                {isEditing && <input type="text" required></input>}
                <span className="player-symbol">{props.symbol}</span>
            </span>
            <button onClick={handleEditClick}>Edit</button>
        </li>
    );
}